import { Component } from '../core/component';

export interface AvatarPickerItem {
  id: string;
  name: string;
  avatar: string;
}

export interface AvatarPickerProps {
  characters: AvatarPickerItem[];
  selectedId: string;
  onSelect?: (character: AvatarPickerItem) => void;
}

export class AvatarPicker extends Component {
  declare props: AvatarPickerProps;
  private selectedId: string;

  private handleClick = (event: MouseEvent) => {
    const card = (event.target as HTMLElement).closest<HTMLButtonElement>(
      '.char-card',
    );
    if (!card) return;

    const fighterId = card.dataset.fighter;
    if (!fighterId) return;

    const selectedChar = this.props.characters.find(
      (char) => char.id === fighterId,
    );
    if (selectedChar) {
      this.props.onSelect?.(selectedChar);
    }
  };

  constructor(props: AvatarPickerProps) {
    super({
      tagName: 'section',
      className: 'parchment parchment--long parchment--list',
      props,
    });
    this.selectedId = props.selectedId;
  }

  onMount(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  onUnmount(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  public setSelected(selectedId: string): void {
    this.selectedId = selectedId;
    this.forEachCard((card) => {
      const isSelected = card.dataset.fighter === selectedId;
      card.classList.toggle('char-card--selected', isSelected);
      card.setAttribute('aria-pressed', String(isSelected));
    });
  }

  public setActive(activeId: string): void {
    this.forEachCard((card) => {
      card.classList.toggle(
        'char-card--active',
        card.dataset.fighter === activeId,
      );
    });
  }

  private forEachCard(callback: (card: HTMLButtonElement) => void): void {
    const cards =
      this.element.querySelectorAll<HTMLButtonElement>('.char-card');
    cards.forEach(callback);
  }

  private renderCard(char: AvatarPickerItem): string {
    const isSelected = char.id === this.selectedId;
    const selectedClass = isSelected ? ' char-card--selected' : '';

    return `
      <button
        type="button"
        class="char-card${selectedClass}"
        data-fighter="${char.id}"
        aria-pressed="${isSelected}"
        aria-label="Просмотреть ${char.name}">
        <div class="char-card__avatar">
          <img src="${char.avatar}" alt="${char.name}" loading="lazy" />
        </div>
      </button>
    `;
  }

  render(): string {
    const { characters } = this.props;

    return `
      <img
        class="parchment__bg"
        src="./img/parchment/Parchment-curved-long.png"
        alt=""
        aria-hidden="true" />

      <div class="parchment__content">
        <h2 class="character-grid__title">
          БОЙЦЫ (<span>${characters.length}</span>)
        </h2>

        <div class="character-grid-wrapper">
          <div class="character-grid">
            ${characters.map((char) => this.renderCard(char)).join('')}
          </div>
        </div>
      </div>
    `;
  }
}
