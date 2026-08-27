import { LogEntry, GameState } from '../types';

export type Listener = (state: GameState) => void;

export class BattleState {
  private state: GameState = {
    playerHp: 0,
    opponentHp: 0,
    logs: [],
  };

  private listeners = new Set<Listener>();

  public update(
    playerHp: number,
    opponentHp: number,
    newLogs: LogEntry[],
  ): void {
    this.state = {
      playerHp,
      opponentHp,
      logs: [...this.state.logs, ...newLogs],
    };
    this.notify();
  }

  public reset(playerHp: number, opponentHp: number): void {
    this.state = { playerHp, opponentHp, logs: [] };
    this.notify();
  }

  public getState(): Readonly<GameState> {
    return this.state;
  }

  public getPlayerHp(): number {
    return this.state.playerHp;
  }

  public getOpponentHp(): number {
    return this.state.opponentHp;
  }

  public getLogs(): readonly LogEntry[] {
    return this.state.logs;
  }

  public subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getState());
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    const currentState = this.getState();
    for (const listener of Array.from(this.listeners)) {
      try {
        listener(currentState);
      } catch (error) {
        console.error('Ошибка в обработчике BattleState:', error);
      }
    }
  }
}
