import { loadData, saveData, STORAGE_KEYS } from '../storage/local-storage';
import type {
  GlobalState,
  BattleOutcomeType,
  BattleHistoryEntry,
} from '../types';
import { DEFAULT_KNIGHT_ID } from '../data/avatars';
import { DEFAULT_AUDIO_TRACK_ID } from '../data/audio-tracks';
import { DEFAULT_BACKGROUND_ID } from '../data/backgrounds';

type Listener = (state: GlobalState) => void;

const INITIAL_STATE: GlobalState = {
  playerName: '',
  selectedAvatarId: DEFAULT_KNIGHT_ID,
  selectedThemeId: DEFAULT_BACKGROUND_ID,
  sound: {
    bgMusicTrack: DEFAULT_AUDIO_TRACK_ID,
    musicVolume: 50,
    isMuted: false,
  },
  stats: {
    totalBattles: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    history: [],
  },
};

class Store {
  private state: GlobalState;
  private listeners = new Set<Listener>();

  constructor() {
    this.state = loadData(STORAGE_KEYS.GLOBAL, INITIAL_STATE);
  }

  public getState(): Readonly<GlobalState> {
    return this.state;
  }

  public setState(newState: Partial<GlobalState>): void {
    this.state = { ...this.state, ...newState };
    saveData(STORAGE_KEYS.GLOBAL, this.state);
    this.notify();
  }

  public recordBattleResult(
    opponentName: string,
    result: BattleOutcomeType,
  ): void {
    const { stats } = this.state;

    const newEntry: BattleHistoryEntry = {
      id: Date.now().toString(),
      opponentName,
      result,
      date: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    this.setState({
      stats: {
        totalBattles: stats.totalBattles + 1,
        wins: result === 'win' ? stats.wins + 1 : stats.wins,
        losses: result === 'loss' ? stats.losses + 1 : stats.losses,
        draws: result === 'draw' ? stats.draws + 1 : stats.draws,
        history: [newEntry, ...stats.history],
      },
    });
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(): void {
    const currentState = this.getState();
    for (const listener of Array.from(this.listeners)) {
      try {
        listener(currentState);
      } catch (error) {
        console.error('Ошибка в подписчике Store:', error);
      }
    }
  }
}

export const store = new Store();
