import { Component } from '../core/component';
import { FighterProfile } from '../types';

export interface FighterStats {
  type: 'player' | 'opponent';
  currentHp: number;
  fighter: FighterProfile;
  name: string;
}

export class FighterCard extends Component {
  declare props: FighterStats;
  private hp: number;
  private hpFill: HTMLElement | null = null;
  private hpText: HTMLElement | null = null;

  constructor(props: FighterStats) {
    super({
      tagName: 'div',
      className: 'fighter-card',
      dataset: { fighter: props.type },
      props,
    });
    this.hp = props.currentHp;
  }

  afterRender(): void {
    this.hpFill = this.element.querySelector<HTMLElement>('.hp-fill');
    this.hpText = this.element.querySelector<HTMLElement>('[data-hp-current]');
  }

  public updateHp(value: number): void {
    this.hp = value;
    const percentage = (this.hp / this.props.fighter.hp) * 100;

    if (this.hpFill) this.hpFill.style.width = `${percentage}%`;
    if (this.hpText) this.hpText.textContent = String(this.hp);
  }

  render(): string {
    const { type, fighter, name } = this.props;
    const percentage = (this.hp / fighter.hp) * 100;
    const imgClass = type === 'player' ? 'fighter-img--player' : 'fighter-img--opponent';

    return `
      <div class="hp-bar">
        <div class="hp-fill" style="width: ${percentage}%"></div>
      </div>
      <div class="fighter">
        <div class="fighter-img-wrapper">
          <img class="fighter-img ${imgClass}" src="${fighter.avatar}" alt="${fighter.name}" />
        </div>
        <div class="fighter-name-wrapper">
          <p class="fighter-name" data-fighter-name>${name}</p>
          <div class="fighter-tooltip">
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">HP:</span>
              <span class="fighter-tooltip__value">
                <span data-hp-current>${this.hp}</span>/<span data-hp-max>${fighter.hp}</span>
              </span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Атака:</span>
              <span class="fighter-tooltip__value" data-stat-attack>${fighter.attackZonesCount}</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Защита:</span>
              <span class="fighter-tooltip__value" data-stat-defense>${fighter.defenseZonesCount}</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Урон:</span>
              <span class="fighter-tooltip__value" data-stat-damage>${fighter.baseDamage}</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Шанс крита:</span>
              <span class="fighter-tooltip__value" data-stat-crit_chance>${fighter.critChance}%</span>
            </div>
            <div class="fighter-tooltip__row">
              <span class="fighter-tooltip__label">Множ. крита:</span>
              <span class="fighter-tooltip__value" data-stat-crit_multiplier>${fighter.critMultiplier}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}