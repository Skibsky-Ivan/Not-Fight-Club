import { Component } from '../core/component';
import { FighterProfile } from '../types';
import { FighterCard } from './fighter-card';
import { getRandomOutcome } from '../data/battle-outcomes';

const ZONES = [
  { id: 'head', title: 'Голова' },
  { id: 'torso', title: 'Торс' },
  { id: 'arms', title: 'Руки' },
  { id: 'groin', title: 'Пах' },
  { id: 'thighs', title: 'Бёдра' },
  { id: 'legs', title: 'Ноги' },
];

export interface BattleFieldProps {
  player: FighterProfile;
  opponent: FighterProfile;
  playerName?: string;
  onAttackSubmit: (attackZones: string[], defenseZones: string[]) => void;
  onNewBattle: () => void;
}

export class BattleField extends Component {
  declare props: BattleFieldProps;

  private playerProfile: FighterProfile;
  private opponentProfile: FighterProfile;

  private playerCard: FighterCard | null = null;
  private opponentCard: FighterCard | null = null;

  private selectedDefense: string[] = [];
  private selectedAttack: string[] = [];

  private attackBtn: HTMLButtonElement | null = null;
  private newBattleBtn: HTMLButtonElement | null = null;
  private resultBlock: HTMLElement | null = null;
  private resultMainWord: HTMLElement | null = null;
  private resultSubText: HTMLElement | null = null;
  private defensePanel: HTMLElement | null = null;
  private attackPanel: HTMLElement | null = null;

  constructor(props: BattleFieldProps) {
    super({
      tagName: 'section',
      className: 'battle-arena',
      attributes: { 'aria-label': 'Арена' },
      props,
    });
    this.playerProfile = props.player;
    this.opponentProfile = props.opponent;
  }

  onMount(): void {
    this.cacheElements();
    this.initFighterCards();
    this.updatePanelUI('defense');
    this.updatePanelUI('attack');
    this.updateAttackButtonState();
    this.bindEvents();
  }

  onUnmount(): void {
    this.playerCard?.unmount();
    this.opponentCard?.unmount();
  }

  private cacheElements(): void {
    this.attackBtn =
      this.element.querySelector<HTMLButtonElement>('#attackBtn');
    this.newBattleBtn = this.element.querySelector<HTMLButtonElement>(
      '[data-action="new-battle"]',
    );
    this.resultBlock = this.element.querySelector<HTMLElement>('#battleResult');
    this.resultMainWord =
      this.element.querySelector<HTMLElement>('#resultMainWord');
    this.resultSubText =
      this.element.querySelector<HTMLElement>('#resultSubText');
    this.defensePanel =
      this.element.querySelector<HTMLElement>('#defensePanel');
    this.attackPanel = this.element.querySelector<HTMLElement>('#attackPanel');
  }

  private initFighterCards(): void {
    const playerSlot = this.element.querySelector('[data-card-slot="player"]');
    const opponentSlot = this.element.querySelector(
      '[data-card-slot="opponent"]',
    );
    if (!playerSlot || !opponentSlot) return;

    this.playerCard = new FighterCard({
      type: 'player',
      currentHp: this.playerProfile.hp,
      fighter: this.playerProfile,
      name: this.props.playerName || this.playerProfile.name,
    });

    this.opponentCard = new FighterCard({
      type: 'opponent',
      currentHp: this.opponentProfile.hp,
      fighter: this.opponentProfile,
      name: this.opponentProfile.name,
    });

    this.playerCard.mount(playerSlot as HTMLElement);
    this.opponentCard.mount(opponentSlot as HTMLElement);
  }

  private bindEvents(): void {
    this.defensePanel?.addEventListener('click', (e) =>
      this.handlePanelClick(e, 'defense'),
    );
    this.attackPanel?.addEventListener('click', (e) =>
      this.handlePanelClick(e, 'attack'),
    );

    this.attackBtn?.addEventListener('click', () => {
      if (this.isReadyToAttack()) {
        this.props.onAttackSubmit(
          [...this.selectedAttack],
          [...this.selectedDefense],
        );
      }
    });

    this.newBattleBtn?.addEventListener('click', this.props.onNewBattle);
  }

  private handlePanelClick(event: Event, type: 'defense' | 'attack'): void {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '.battle-zone',
    );
    if (!btn?.dataset.zone) return;
    this.handleZoneSelect(type, btn.dataset.zone);
  }

  private handleZoneSelect(type: 'defense' | 'attack', zone: string): void {
    const { queue, maxLimit } = this.getQueueInfo(type);

    const index = queue.indexOf(zone);
    if (index !== -1) {
      queue.splice(index, 1);
    } else {
      if (queue.length >= maxLimit) queue.shift();
      queue.push(zone);
    }

    this.updatePanelUI(type);
    this.updateAttackButtonState();
  }

  private getQueueInfo(type: 'defense' | 'attack'): {
    queue: string[];
    maxLimit: number;
  } {
    if (type === 'defense') {
      return {
        queue: this.selectedDefense,
        maxLimit: this.playerProfile.defenseZonesCount,
      };
    }
    return {
      queue: this.selectedAttack,
      maxLimit: this.playerProfile.attackZonesCount,
    };
  }

  private isReadyToAttack(): boolean {
    return (
      this.selectedDefense.length === this.playerProfile.defenseZonesCount &&
      this.selectedAttack.length === this.playerProfile.attackZonesCount
    );
  }

  private updatePanelUI(type: 'defense' | 'attack'): void {
    const panelId = type === 'defense' ? 'defensePanel' : 'attackPanel';
    const countId = type === 'defense' ? 'defenseCount' : 'attackCount';
    const { queue, maxLimit } = this.getQueueInfo(type);

    const panel = this.element.querySelector(`#${panelId}`);
    if (!panel) return;

    panel.querySelectorAll<HTMLButtonElement>('.battle-zone').forEach((btn) => {
      const isSelected = btn.dataset.zone
        ? queue.includes(btn.dataset.zone)
        : false;
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.classList.toggle('battle-zone--selected', isSelected);
    });

    const countEl = this.element.querySelector(`#${countId}`);
    if (countEl) countEl.textContent = `(${queue.length}/${maxLimit})`;
  }

  private updateAttackButtonState(): void {
    if (this.attackBtn) this.attackBtn.disabled = !this.isReadyToAttack();
  }

  public resetSelections(): void {
    this.selectedDefense = [];
    this.selectedAttack = [];
    this.updatePanelUI('defense');
    this.updatePanelUI('attack');
    this.updateAttackButtonState();
  }

  public updateHp(target: 'player' | 'opponent', currentHp: number): void {
    if (target === 'player') {
      this.playerCard?.updateHp(currentHp);
    } else {
      this.opponentCard?.updateHp(currentHp);
    }
  }

  public showResult(outcome: 'win' | 'loss' | 'draw'): void {
    if (!this.resultBlock || !this.resultMainWord || !this.resultSubText)
      return;

    const text = getRandomOutcome(outcome);

    this.resultBlock.className = `battle-result battle-result--${outcome}`;
    this.resultMainWord.textContent = text.main;
    this.resultSubText.textContent = text.sub;
    this.resultBlock.hidden = false;

    if (this.attackBtn) this.attackBtn.hidden = true;
    this.disableControls();
  }

  public disableControls(): void {
    this.element
      .querySelectorAll<HTMLElement>('.zones-panel')
      .forEach((panel) => {
        panel.style.pointerEvents = 'none';
        panel.style.opacity = '0.5';
      });
  }

  public resetBattle(player: FighterProfile, opponent: FighterProfile): void {
    this.playerProfile = player;
    this.opponentProfile = opponent;

    this.playerCard?.unmount();
    this.opponentCard?.unmount();
    this.playerCard = null;
    this.opponentCard = null;

    this.initFighterCards();
    this.resetResultUI();
    this.enableControls();
    this.updateAttackButtonState();
  }

  private resetResultUI(): void {
    if (this.resultBlock) this.resultBlock.hidden = true;
    if (this.resultMainWord) this.resultMainWord.textContent = '';
    if (this.resultSubText) this.resultSubText.textContent = '';
    if (this.attackBtn) this.attackBtn.hidden = false;
  }

  private enableControls(): void {
    this.element
      .querySelectorAll<HTMLElement>('.zones-panel')
      .forEach((panel) => {
        panel.style.pointerEvents = '';
        panel.style.opacity = '';
      });
  }

  private renderZoneButtons(): string {
    return ZONES.map(
      ({ id, title }) => `
      <button class="battle-zone" type="button" data-zone="${id}" title="${title}" aria-pressed="false">
        <span class="battle-zone__icon" aria-hidden="true"></span>
      </button>
    `,
    ).join('');
  }

  render(): string {
    const player = this.playerProfile;
    const zoneButtons = this.renderZoneButtons();

    return `
      <div class="fighter-side fighter-side--player">
        <h2 class="visually-hidden">Боец игрока</h2>

        <fieldset class="zones-panel zones-panel--defense" id="defensePanel" data-required="${player.defenseZonesCount}">
          <legend class="zones-panel__title">
            Защита
            <span class="zones-panel__count" id="defenseCount">(0/${player.defenseZonesCount})</span>
          </legend>
          <div class="slots">${zoneButtons}</div>
        </fieldset>

        <div data-card-slot="player"></div>
      </div>

      <div class="battle-center">
        <button class="btn btn--attack" id="attackBtn" type="button" disabled>ВПЕРЁД!</button>

        <div class="battle-result" id="battleResult" hidden>
          <p class="battle-result__title">
            <span class="battle-result__main" id="resultMainWord">ПОБЕДА</span>
            <span class="battle-result__sub" id="resultSubText">Враг повержен.</span>
          </p>
          <button type="button" class="btn btn--new-battle" data-action="new-battle">Новый бой</button>
        </div>
      </div>

      <div class="fighter-side fighter-side--opponent">
        <h2 class="visually-hidden">Боец противника</h2>

        <div data-card-slot="opponent"></div>

        <fieldset class="zones-panel zones-panel--attack" id="attackPanel" data-required="${player.attackZonesCount}">
          <legend class="zones-panel__title">
            Атака
            <span class="zones-panel__count" id="attackCount">(0/${player.attackZonesCount})</span>
          </legend>
          <div class="slots">${zoneButtons}</div>
        </fieldset>
      </div>
    `;
  }
}
