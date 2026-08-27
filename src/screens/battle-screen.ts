import { Component } from '../core/component';
import { store } from '../core/store';
import { Header } from '../components/header';
import { BattleField } from '../components/battle-field';
import { BattleLog } from '../components/battle-log';
import { resolveTurn, rollCrit, getRandomZones } from '../game/battle-engine';
import { Fighter } from '../game/fighter';
import { getRandomOpponent } from '../data/opponents';
import { getKnightById } from '../data/avatars';
import {
  loadData,
  saveData,
  clearData,
  STORAGE_KEYS,
} from '../storage/local-storage';
import {
  RoundData,
  FighterProfile,
  FighterInput,
  LocationType,
  BattleResultRound,
} from '../types';
import { getRandomStartPhrase } from '../data/battle-start-phrases';
import { getRandomEndPhrase } from '../data/battle-end-phrases';

const ZONES = ['head', 'torso', 'arms', 'groin', 'thighs', 'legs'];

interface PersistedBattleState {
  playerProfile: FighterProfile;
  opponentProfile: FighterProfile;
  playerHp: number;
  opponentHp: number;
  logs: RoundData[];
  intro?: string;
  outro?: string;
  outcome?: 'win' | 'loss' | 'draw';
}

export class BattleScreen extends Component {
  private header: Header | null = null;
  private battleField: BattleField | null = null;
  private battleLog: BattleLog | null = null;

  private playerProfile: FighterProfile | null = null;
  private opponentProfile: FighterProfile | null = null;
  private playerFighter: Fighter | null = null;
  private opponentFighter: Fighter | null = null;

  private isRestored = false;
  private currentIntro = '';
  private currentOutro = '';
  private battleOutcome: 'win' | 'loss' | 'draw' | null = null;
  private rounds: RoundData[] = [];

  constructor() {
    super({
      tagName: 'div',
      className: 'battle-wrapper',
    });
  }

  // ===== Lifecycle =====

  onMount(): void {
    this.loadOrCreateBattle();
    this.initHeader();
    this.initArena();
    this.initLog();
  }

  onUnmount(): void {
    this.header?.unmount();
    this.battleField?.unmount();
    this.battleLog?.unmount();
  }

  // ===== Setup =====

  private initHeader(): void {
    const slot = this.element.querySelector('[data-header-slot]');
    if (!slot) return;

    this.header = new Header();
    this.header.mount(slot as HTMLElement);
  }

  private loadOrCreateBattle(): void {
    const state = store.getState();
    const restored = loadData<PersistedBattleState | null>(
      STORAGE_KEYS.BATTLE,
      null,
    );

    if (restored) {
      this.isRestored = true;
      this.playerProfile = restored.playerProfile;
      this.opponentProfile = restored.opponentProfile;
      this.playerFighter = new Fighter(restored.playerHp);
      this.opponentFighter = new Fighter(restored.opponentHp);
      this.currentIntro = restored.intro || '';
      this.currentOutro = restored.outro || '';
      this.rounds = [...(restored.logs || [])];
      this.battleOutcome = restored.outcome ?? null;
    } else {
      this.isRestored = false;
      this.playerProfile = getKnightById(state.selectedAvatarId);
      this.opponentProfile = getRandomOpponent();
      this.playerFighter = new Fighter(this.playerProfile.hp);
      this.opponentFighter = new Fighter(this.opponentProfile.hp);
      this.currentIntro = '';
      this.currentOutro = '';
      this.battleOutcome = null;
      this.rounds = [];
    }
  }

  private initArena(): void {
    const slot = this.element.querySelector('[data-arena-slot]');
    if (!slot || !this.playerProfile || !this.opponentProfile) return;

    this.battleField = new BattleField({
      player: this.playerProfile,
      opponent: this.opponentProfile,
      playerName: store.getState().playerName,
      onAttackSubmit: this.handleTurn,
      onNewBattle: this.handleNewBattle,
    });

    this.battleField.mount(slot as HTMLElement);
    this.battleField.updateHp('player', this.playerFighter!.getHp());
    this.battleField.updateHp('opponent', this.opponentFighter!.getHp());

    if (this.battleOutcome) {
      this.battleField.showResult(this.battleOutcome);
    }
  }

  private initLog(): void {
    const slot = this.element.querySelector('[data-log-slot]');
    if (!slot) return;

    this.battleLog = new BattleLog([...this.rounds]);
    this.battleLog.mount(slot as HTMLElement);

    if (this.isRestored) {
      if (this.currentIntro) {
        this.battleLog.addPhrase('intro', this.currentIntro);
      }
      if (this.currentOutro) {
        this.battleLog.addPhrase('outro', this.currentOutro);
      }
    } else {
      this.addStartPhrase();
    }
  }

  private addStartPhrase(): void {
    if (!this.opponentProfile) return;

    const location = store.getState().selectedThemeId as LocationType;
    const text = getRandomStartPhrase(this.opponentProfile.id, location);
    this.currentIntro = text;
    this.battleLog?.addPhrase('intro', text);
  }

  private addEndPhrase(outcome: 'win' | 'loss' | 'draw'): void {
    if (!this.opponentProfile) return;

    const location = store.getState().selectedThemeId as LocationType;
    const text = getRandomEndPhrase(this.opponentProfile.id, location, outcome);
    this.currentOutro = text;
    this.battleLog?.addPhrase('outro', text);
  }

  // ===== Battle Logic =====

  private handleTurn = (
    playerAttackZones: string[],
    playerDefenseZones: string[],
  ): void => {
    if (!this.canProcessTurn()) return;

    const result = this.resolveBattleTurn(
      playerAttackZones,
      playerDefenseZones,
    );
    this.applyRoundResult(result);

    const outcome = this.checkBattleOutcome();
    if (outcome) {
      this.finalizeBattle(outcome);
      return;
    }

    this.saveBattleState();
  };

  private canProcessTurn(): boolean {
    return !!(
      this.playerProfile &&
      this.opponentProfile &&
      this.playerFighter &&
      this.opponentFighter
    );
  }

  private resolveBattleTurn(
    playerAttackZones: string[],
    playerDefenseZones: string[],
  ): BattleResultRound {
    const opponentAttackZones = getRandomZones(
      ZONES,
      this.opponentProfile!.attackZonesCount,
    );
    const opponentDefenseZones = getRandomZones(
      ZONES,
      this.opponentProfile!.defenseZonesCount,
    );

    return resolveTurn(
      this.createFighterInput(
        this.playerProfile!,
        playerAttackZones,
        playerDefenseZones,
        true,
      ),
      this.createFighterInput(
        this.opponentProfile!,
        opponentAttackZones,
        opponentDefenseZones,
      ),
    );
  }

  private applyRoundResult(result: BattleResultRound): void {
    this.playerFighter!.takeDamage(result.playerDamageTaken);
    this.opponentFighter!.takeDamage(result.opponentDamageTaken);

    this.battleField?.updateHp('player', this.playerFighter!.getHp());
    this.battleField?.updateHp('opponent', this.opponentFighter!.getHp());

    this.battleLog?.addRound(result.logs);
    this.rounds.push(result.logs);
  }

  private checkBattleOutcome(): 'win' | 'loss' | 'draw' | null {
    const playerAlive = this.playerFighter!.isAlive();
    const opponentAlive = this.opponentFighter!.isAlive();

    if (!playerAlive && !opponentAlive) return 'draw';
    if (!playerAlive) return 'loss';
    if (!opponentAlive) return 'win';
    return null;
  }

  private finalizeBattle(outcome: 'win' | 'loss' | 'draw'): void {
    this.battleOutcome = outcome;
    this.addEndPhrase(outcome);
    this.battleField?.showResult(outcome);
    store.recordBattleResult(this.opponentProfile!.name, outcome);
    this.saveBattleState(outcome);
  }

  private handleNewBattle = (): void => {
    clearData(STORAGE_KEYS.BATTLE);

    const state = store.getState();
    this.playerProfile = getKnightById(state.selectedAvatarId);
    this.opponentProfile = getRandomOpponent();
    this.playerFighter = new Fighter(this.playerProfile.hp);
    this.opponentFighter = new Fighter(this.opponentProfile.hp);

    this.isRestored = false;
    this.currentIntro = '';
    this.currentOutro = '';
    this.battleOutcome = null;
    this.rounds = [];

    this.battleField?.resetBattle(this.playerProfile, this.opponentProfile);
    this.battleField?.updateHp('player', this.playerFighter.getHp());
    this.battleField?.updateHp('opponent', this.opponentFighter.getHp());

    this.battleLog?.clear();
    this.addStartPhrase();
    this.saveBattleState();
  };

  private createFighterInput(
    profile: FighterProfile,
    attackZones: string[],
    defenseZones: string[],
    isPlayer = false,
  ): FighterInput {
    const name = isPlayer
      ? store.getState().playerName || profile.name
      : profile.name;

    return {
      name,
      attackZones: attackZones.map((zone) => ({
        zone,
        isCritical: rollCrit(profile.critChance),
      })),
      defenseZones,
      baseDamage: profile.baseDamage,
      critMultiplier: profile.critMultiplier,
    };
  }

  // ===== Persistence =====

  private saveBattleState(outcome?: 'win' | 'loss' | 'draw'): void {
    if (
      !this.playerProfile ||
      !this.opponentProfile ||
      !this.playerFighter ||
      !this.opponentFighter
    ) {
      return;
    }

    const state: PersistedBattleState = {
      playerProfile: this.playerProfile,
      opponentProfile: this.opponentProfile,
      playerHp: this.playerFighter.getHp(),
      opponentHp: this.opponentFighter.getHp(),
      logs: this.rounds,
      intro: this.currentIntro,
      outro: this.currentOutro,
      outcome,
    };

    saveData(STORAGE_KEYS.BATTLE, state);
  }

  // ===== Render =====

  render(): string {
    return `
      <div data-header-slot></div>
      <main class="page battle-page">
        <h1 class="page-title visually-hidden">Страница боя</h1>
        <div class="battle-layout">
          <div data-arena-slot></div>
          <div data-log-slot></div>
        </div>
      </main>
    `;
  }
}
