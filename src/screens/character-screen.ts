import { Component } from '../core/component';
import { store } from '../core/store';
import { Header } from '../components/header';
import { AvatarPicker, AvatarPickerItem } from '../components/avatar-picker';
import {
  CharacterDetails,
  CharacterData,
} from '../components/character-details';
import { BattleStats } from '../components/battle-stats';
import { getKnightById, DEFAULT_KNIGHT_ID, KNIGHTS } from '../data/avatars';
import { OPPONENTS } from '../data/opponents';
import { getRandomRogueTaunt } from '../data/robber-taunts';
import { FighterProfile } from '../types';

const ALL_FIGHTERS: FighterProfile[] = [...KNIGHTS, ...OPPONENTS];

export class CharacterScreen extends Component {
  private header: Header | null = null;
  private avatarPicker: AvatarPicker | null = null;
  private characterDetails: CharacterDetails | null = null;
  private battleStats: BattleStats | null = null;
  private unsubscribeStore: (() => void) | null = null;

  constructor() {
    super({
      tagName: 'div',
      className: 'character-wrapper',
    });
  }

  // ===== Lifecycle =====

  onMount(): void {
    this.initHeader();
    this.initPicker();
    this.initDetails();
    this.initStats();
  }

  onUnmount(): void {
    this.unsubscribeStore?.();
    this.header?.unmount();
    this.avatarPicker?.unmount();
    this.characterDetails?.unmount();
    this.battleStats?.unmount();
  }

  // ===== Setup =====

  private initHeader(): void {
    const slot = this.element.querySelector('[data-header-slot]');
    if (!slot) return;

    this.header = new Header();
    this.header.mount(slot as HTMLElement);
  }

  private initPicker(): void {
    const slot = this.element.querySelector('[data-picker-slot]');
    if (!slot) return;

    const state = store.getState();
    const currentId = state.selectedAvatarId || DEFAULT_KNIGHT_ID;

    const pickerItems: AvatarPickerItem[] = ALL_FIGHTERS.map((fighter) => ({
      id: fighter.id,
      name: fighter.name,
      avatar: fighter.avatar,
    }));

    this.avatarPicker = new AvatarPicker({
      characters: pickerItems,
      selectedId: currentId,
      onSelect: this.onPickerSelect,
    });

    this.avatarPicker.mount(slot as HTMLElement);
  }

  private initDetails(): void {
    const slot = this.element.querySelector('[data-details-slot]');
    if (!slot) return;

    const state = store.getState();
    const currentId = state.selectedAvatarId || DEFAULT_KNIGHT_ID;
    const initialFighter = getKnightById(currentId);

    this.characterDetails = new CharacterDetails({
      character: this.mapToCharacterData(initialFighter, currentId),
      onSelect: this.onDetailsSelect,
    });

    this.characterDetails.mount(slot as HTMLElement);
  }

  private initStats(): void {
    const slot = this.element.querySelector('[data-stats-slot]');
    if (!slot) return;

    const state = store.getState();

    this.battleStats = new BattleStats({
      playerName: state.playerName,
      stats: state.stats,
    });

    this.battleStats.mount(slot as HTMLElement);

    this.unsubscribeStore = store.subscribe((newState) => {
      this.battleStats?.updateStats(newState.playerName, newState.stats);
    });
  }

  // ===== Handlers =====

  private onPickerSelect = (char: AvatarPickerItem): void => {
    const fighter = ALL_FIGHTERS.find((f) => f.id === char.id);
    if (!fighter) return;

    this.avatarPicker?.setActive(char.id);
    this.updateDetails(fighter);
  };

  private onDetailsSelect = (characterData: CharacterData): void => {
    const selectedId = characterData.fighter.id;

    store.setState({ selectedAvatarId: selectedId });
    this.avatarPicker?.setSelected(selectedId);
    this.updateDetails(characterData.fighter);
  };

  // ===== Helpers =====

  private mapToCharacterData(
    fighter: FighterProfile,
    currentId: string,
  ): CharacterData {
    const isKnight = KNIGHTS.some((k) => k.id === fighter.id);
    const isSelected = fighter.id === currentId;

    if (isKnight) {
      return { fighter, isSelectable: true, isSelected };
    }

    return {
      fighter,
      isSelectable: false,
      unselectableMessage: getRandomRogueTaunt(fighter.id),
    };
  }

  private updateDetails(fighter: FighterProfile): void {
    const currentId = store.getState().selectedAvatarId || DEFAULT_KNIGHT_ID;
    this.characterDetails?.setCharacter(
      this.mapToCharacterData(fighter, currentId),
    );
  }

  // ===== Render =====

  render(): string {
    return `
      <div data-header-slot></div>
      <main class="page character-page">
        <div data-picker-slot></div>
        <div data-details-slot></div>
        <div data-stats-slot></div>
      </main>
    `;
  }
}
