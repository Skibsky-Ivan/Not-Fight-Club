import { Component } from '../core/component';
import { LogEntry, RoundData } from '../types';

const ZONE_NAMES: Record<string, string> = {
  head: 'Голова',
  torso: 'Торс',
  arms: 'Руки',
  groin: 'Яйки',
  thighs: 'Бёдра',
  legs: 'Ноги',
};

function getZoneName(zone: string): string {
  return ZONE_NAMES[zone] || zone;
}


export class BattleLog extends Component {
  declare props: RoundData[];
  private rounds: RoundData[] = [];
  private intro = '';
  private outro = '';
  private logContainer: HTMLElement | null = null;

  constructor(rounds: RoundData[] = []) {
    super({
      tagName: 'section',
      className: 'battle-log',
      props: rounds,
    });
    this.rounds = rounds;
  }

  afterRender(): void {
    this.logContainer =
      this.element.querySelector<HTMLElement>('.log-container');
  }

  private scrollToBottom(): void {
    if (!this.logContainer) return;
    this.logContainer.scrollTop = this.logContainer.scrollHeight;
  }

  public addPhrase(type: 'intro' | 'outro', text: string): void {
    if (type === 'intro') this.intro = text;
    else this.outro = text;
    this.update();
    this.scrollToBottom();
  }

  public addRound(round: RoundData): void {
    this.rounds = [...this.rounds, round];
    this.update();
    this.scrollToBottom();
  }

  public clear(): void {
    this.rounds = [];
    this.intro = '';
    this.outro = '';
    this.update();
  }

  private renderActionLine(entry: LogEntry): string {
    const attacker = `<span class="log-actor">${entry.attacker}</span>`;
    const target = `<span class="log-actor">${entry.target}</span>`;
    const zone = `<span class="log-zone">«${getZoneName(entry.zone)}»</span>`;
    const damage = `<span class="log-damage">${entry.damage} урона</span>`;

    let text: string;
    let modifier: string;

    if (entry.isCritical && entry.isBlocked) {
      text = `<span class="log-status log-status--crit">Критический</span> удар ${attacker} <span class="log-status log-status--pierce_block">пробивает</span> блок ${target} в зоне ${zone} и наносит ${damage}!`;
      modifier = 'crit-pierce';
    } else if (entry.isCritical) {
      text = `<span class="log-status log-status--crit">Критический</span> удар ${attacker} наносит ${damage} по ${target} в зону ${zone}!`;
      modifier = 'crit';
    } else if (entry.isBlocked) {
      text = `${attacker} атакует в зону ${zone}, но ${target} успешно <span class="log-status log-status--block">блокирует</span> удар!`;
      modifier = 'blocked';
    } else {
      text = `${attacker} наносит ${damage} по ${target} в зону ${zone}!`;
      modifier = 'hit';
    }

    return `<p class="log-entry log-entry--${modifier}">${text}</p>`;
  }

  private renderRoundHTML(roundNumber: number, round: RoundData): string {
    const actionsHtml = round
      .map((action) => this.renderActionLine(action))
      .join('');

    return `
      <div class="log-round" data-round="${roundNumber}">
        <div class="log-round__header">| РАУНД ${roundNumber} |</div>
        <div class="log-round__content">${actionsHtml}</div>
      </div>
    `;
  }

  private renderPhrase(type: 'intro' | 'outro', text: string): string {
    return `
      <div class="log-round log-round--${type}">
        <div class="log-round__content">
          <p class="log-phrase log-phrase--${type}">${text}</p>
        </div>
      </div>
    `;
  }

  render(): string {
    const introHtml = this.intro ? this.renderPhrase('intro', this.intro) : '';
    const outroHtml = this.outro ? this.renderPhrase('outro', this.outro) : '';
    const roundsHtml = this.rounds
      .map((round, index) => this.renderRoundHTML(index + 1, round))
      .join('');

    return `
      <img
        class="battle-log__bg"
        src="./img/parchment/Parchment-curved-short.png"
        alt=""
        aria-hidden="true" />

      <div class="parchment__content" id="battleLog" aria-live="polite" aria-atomic="false">
        <h2 class="visually-hidden">ЖУРНАЛ БОЯ</h2>

        <div class="log-container" data-log-container>
          ${introHtml}
          ${roundsHtml}
          ${outroHtml}
        </div>
      </div>
    `;
  }
}
