import { Component } from '../core/component';
import type { GameStats } from '../types';

export interface BattleStatsProps {
  playerName: string;
  stats: GameStats;
}

export class BattleStats extends Component {
  declare props: BattleStatsProps;

  private nameEl: HTMLElement | null = null;
  private totalEl: HTMLElement | null = null;
  private winsEl: HTMLElement | null = null;
  private lossesEl: HTMLElement | null = null;
  private drawsEl: HTMLElement | null = null;
  private historyList: HTMLElement | null = null;

  constructor(props: BattleStatsProps) {
    super({
      tagName: 'section',
      className: 'parchment parchment--long parchment--stats',
      props,
    });
  }

  afterRender(): void {
    this.nameEl = this.element.querySelector('[data-stats-name]');
    this.totalEl = this.element.querySelector('[data-stats-total]');
    this.winsEl = this.element.querySelector('[data-stats-wins]');
    this.lossesEl = this.element.querySelector('[data-stats-losses]');
    this.drawsEl = this.element.querySelector('[data-stats-draws]');
    this.historyList = this.element.querySelector('[data-battle-history]');
  }

  onMount(): void {
    this.updateStats(this.props.playerName, this.props.stats);
  }

  public updateStats(playerName: string, stats: GameStats): void {
    if (this.nameEl) this.nameEl.textContent = playerName || 'Безымянный';
    if (this.totalEl) this.totalEl.textContent = String(stats.totalBattles);
    if (this.winsEl) this.winsEl.textContent = String(stats.wins);
    if (this.lossesEl) this.lossesEl.textContent = String(stats.losses);
    if (this.drawsEl) this.drawsEl.textContent = String(stats.draws);

    if (this.historyList) {
      this.historyList.innerHTML =
        stats.history.length === 0
          ? '<li class="stats-history__empty">Пока нет боёв</li>'
          : stats.history
              .map(
                (entry, index) => `
            <li class="battle-record">
              <span class="battle-record__number">#${stats.history.length - index}</span>
              <span class="battle-record__matchup">vs ${entry.opponentName}</span>
              <span class="battle-record__result battle-record__result--${entry.result}">${this.translateResult(entry.result)}</span>
              <span class="battle-record__date">${entry.date}</span>
            </li>
          `,
              )
              .join('');
    }
  }

  private translateResult(result: 'win' | 'loss' | 'draw'): string {
    const map = { win: 'Победа', loss: 'Поражение', draw: 'Ничья' };
    return map[result];
  }

  render(): string {
    return `
      <img
        class="parchment__bg"
        src="./img/parchment/Parchment-curved-long.png"
        alt=""
        aria-hidden="true" />

      <div class="parchment__content">
        <div class="parchment__seal" aria-hidden="true"></div>

        <h2 class="stats-title">СТАТИСТИКА БОЕВ</h2>

        <dl class="stats-list" aria-live="polite" aria-atomic="false">
          <div class="stats-row stats-row--player">
            <dt>боец:</dt>
            <dd class="stats-value stats-player-name" data-stats-name>Безымянный</dd>
          </div>

          <div class="stats-summary">
            <div class="stats-row">
              <dt>всего боев:</dt>
              <dd class="stats-value" data-stats-total>0</dd>
            </div>
            <div class="stats-row">
              <dt>побед:</dt>
              <dd class="stats-value stats-value--win" data-stats-wins>0</dd>
            </div>
            <div class="stats-row">
              <dt>поражений:</dt>
              <dd class="stats-value stats-value--loss" data-stats-losses>0</dd>
            </div>
            <div class="stats-row">
              <dt>ничьи:</dt>
              <dd class="stats-value stats-value--draw" data-stats-draws>0</dd>
            </div>
          </div>
        </dl>

        <div class="stats-history">
          <h3 class="stats-history__title">Список Боев:</h3>
          <ul
            class="stats-history__list"
            data-battle-history
            aria-live="polite"
            aria-atomic="false">
          </ul>
        </div>
      </div>
    `;
  }
}
