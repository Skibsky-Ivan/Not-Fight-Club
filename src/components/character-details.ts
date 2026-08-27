import { Component } from '../core/component';
import { FighterProfile } from '../types';

export interface CharacterData {
  fighter: FighterProfile;
  isSelectable?: boolean;
  unselectableMessage?: string;
  isSelected?: boolean;
}

export interface CharacterDetailsProps {
  character: CharacterData;
  onSelect?: (character: CharacterData) => void;
}

export class CharacterDetails extends Component {
  declare props: CharacterDetailsProps;
  private character: CharacterData;

  private handleSelect = (event: MouseEvent) => {
    const btn = (event.target as HTMLElement).closest(
      '[data-action="select-avatar"]',
    );
    if (btn && this.props.onSelect) {
      this.props.onSelect(this.character);
    }
  };

  constructor(props: CharacterDetailsProps) {
    super({
      tagName: 'section',
      className: 'parchment parchment--info',
      props,
    });
    this.character = props.character;
  }

  onMount(): void {
    this.element.addEventListener('click', this.handleSelect);
  }

  onUnmount(): void {
    this.element.removeEventListener('click', this.handleSelect);
  }

  public setCharacter(character: CharacterData): void {
    this.character = character;
    this.update();
  }

  render(): string {
    const {
      fighter,
      isSelectable = true,
      isSelected = false,
      unselectableMessage,
    } = this.character;

    const actionHtml = isSelectable
      ? isSelected
        ? `<div class="char-details__current">Текущий</div>`
        : `<button type="button" class="btn btn--choose-character" data-action="select-avatar">выбрать</button>`
      : `<div class="char-details__unselectable">${unselectableMessage ?? 'Разбойники не подчиняются приказам!'}</div>`;

    return `
      <img class="parchment__bg" src="./img/parchment/Parchment-straight.png" alt="" />

      <div class="parchment__content">
        <div class="char-details">
          <div class="char-details__sprite">
            <img src="${fighter.avatar}" alt="${fighter.name}" loading="lazy" data-char-preview />
          </div>

          <h2 class="char-details__title" data-char-name>${fighter.name}</h2>
          <p class="char-details__description" data-char-description>${fighter.description}</p>

          <dl class="char-details__stats">
            <div class="char-details__stat">
              <dt>Зоны атаки:</dt>
              <dd data-stat-attack-zones>${fighter.attackZonesCount}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Зоны защиты:</dt>
              <dd data-stat-defense-zones>${fighter.defenseZonesCount}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Урон:</dt>
              <dd data-stat-damage>${fighter.baseDamage}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Шанс крит удара:</dt>
              <dd data-stat-crit_chance>${fighter.critChance}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Множитель крита:</dt>
              <dd data-stat-crit_multiplier>${fighter.critMultiplier}</dd>
            </div>
            <div class="char-details__stat">
              <dt>Здоровье:</dt>
              <dd data-stat-hp>${fighter.hp}</dd>
            </div>
          </dl>

          ${actionHtml}
        </div>
      </div>
    `;
  }
}
