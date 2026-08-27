import { Component } from '../core/component';
import { store } from '../core/store';
import { validatePlayerName } from '../utils/validation';
import { Header } from '../components/header';
import { BACKGROUNDS, DEFAULT_BACKGROUND_ID } from '../data/backgrounds';
import { AUDIO_TRACKS, DEFAULT_AUDIO_TRACK_ID } from '../data/audio-tracks';
import { FormErrorHandler } from '../utils/form-error-handler';
import { GlobalState } from '../types/index';

export class SettingsScreen extends Component {
  private header: Header | null = null;
  private errorHandler: FormErrorHandler | null = null;
  private unsubscribeStore: (() => void) | null = null;

  private nameInput: HTMLInputElement | null = null;
  private volumeInput: HTMLInputElement | null = null;
  private volumeValue: HTMLElement | null = null;
  private errorEl: HTMLElement | null = null;
  private bgRadios: NodeListOf<HTMLInputElement> | null = null;
  private muteBtn: HTMLButtonElement | null = null;
  private trackSelect: HTMLSelectElement | null = null;

  constructor() {
    super({
      tagName: 'div',
      className: 'settings-wrapper',
    });
  }

  // ===== Lifecycle =====

  onMount(): void {
    this.initHeader();
    this.cacheElements();
    this.syncUIWithStore();
    this.bindEvents();
    this.unsubscribeStore = store.subscribe(this.handleStoreUpdate);
  }

  onUnmount(): void {
    this.unbindEvents();
    this.unsubscribeStore?.();
    this.header?.unmount();
    this.errorHandler?.clear();
  }

  // ===== Setup =====

  private initHeader(): void {
    const slot = this.element.querySelector('[data-header-slot]');
    if (!slot) return;

    this.header = new Header();
    this.header.mount(slot as HTMLElement);
  }

  private cacheElements(): void {
    this.nameInput = this.element.querySelector('#settingsCharName');
    this.volumeInput = this.element.querySelector('#settingsMusicVolume');
    this.volumeValue = this.element.querySelector('#settingsVolumeValue');
    this.errorEl = this.element.querySelector('#settingsNameError');
    this.bgRadios = this.element.querySelectorAll('input[name="bgChoice"]');
    this.muteBtn = this.element.querySelector('[data-action="toggle-mute"]');
    this.trackSelect = this.element.querySelector('#settingsTrack');

    if (this.errorEl && this.nameInput) {
      this.errorHandler = new FormErrorHandler(this.errorEl, this.nameInput);
    }
  }

  private syncUIWithStore(): void {
    const state = store.getState();

    if (this.nameInput) this.nameInput.value = state.playerName || '';
    if (this.volumeInput) {
      this.volumeInput.value = String(state.sound.musicVolume);
    }
    if (this.volumeValue) {
      this.volumeValue.textContent = `${state.sound.musicVolume}%`;
    }

    const currentBgId = state.selectedThemeId || DEFAULT_BACKGROUND_ID;
    this.bgRadios?.forEach((radio) => {
      radio.checked = radio.value === currentBgId;
    });

    if (this.muteBtn) {
      this.muteBtn.textContent = state.sound.isMuted ? 'Вкл' : 'Выкл';
    }
    if (this.trackSelect) {
      this.trackSelect.value =
        state.sound.bgMusicTrack || DEFAULT_AUDIO_TRACK_ID;
    }
  }

  // ===== Events =====

  private bindEvents(): void {
    this.volumeInput?.addEventListener('input', this.handleVolumeInput);
    this.nameInput?.addEventListener('keydown', this.handleNameKeydown);
    this.nameInput?.addEventListener('blur', this.handleNameBlur);
    this.bgRadios?.forEach((radio) => {
      radio.addEventListener('change', this.handleBgChange);
    });
    this.muteBtn?.addEventListener('click', this.handleMuteClick);
    this.trackSelect?.addEventListener('change', this.handleTrackChange);
  }

  private unbindEvents(): void {
    this.volumeInput?.removeEventListener('input', this.handleVolumeInput);
    this.nameInput?.removeEventListener('keydown', this.handleNameKeydown);
    this.nameInput?.removeEventListener('blur', this.handleNameBlur);
    this.bgRadios?.forEach((radio) => {
      radio.removeEventListener('change', this.handleBgChange);
    });
    this.muteBtn?.removeEventListener('click', this.handleMuteClick);
    this.trackSelect?.removeEventListener('change', this.handleTrackChange);
  }

  // ===== Handlers =====

  private handleVolumeInput = (): void => {
    if (!this.volumeInput) return;

    const value = parseInt(this.volumeInput.value, 10);
    if (this.volumeValue) this.volumeValue.textContent = `${value}%`;

    store.setState({
      sound: {
        ...store.getState().sound,
        musicVolume: value,
      },
    });
  };

  private handleNameKeydown = (e: KeyboardEvent): void => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    this.saveName();
    this.nameInput?.blur();
  };

  private handleNameBlur = (): void => {
    this.saveName();
  };

  private saveName(): void {
    if (!this.nameInput) return;

    this.errorHandler?.clear();
    const name = this.nameInput.value.trim();
    const validation = validatePlayerName(name);

    if (!validation.valid) {
      this.errorHandler?.show(validation.message);
      this.nameInput.value = store.getState().playerName || '';
      return;
    }

    store.setState({ playerName: name });
  }

  private handleBgChange = (e: Event): void => {
    const radio = e.target as HTMLInputElement;
    if (!radio.checked) return;

    store.setState({ selectedThemeId: radio.value });
  };

  private handleMuteClick = (): void => {
    const state = store.getState();
    store.setState({
      sound: {
        ...state.sound,
        isMuted: !state.sound.isMuted,
      },
    });
  };

  private handleTrackChange = (): void => {
    if (!this.trackSelect) return;

    store.setState({
      sound: {
        ...store.getState().sound,
        bgMusicTrack: this.trackSelect.value,
      },
    });
  };

  private handleStoreUpdate = (newState: GlobalState): void => {
    if (this.muteBtn) {
      this.muteBtn.textContent = newState.sound.isMuted ? 'Вкл' : 'Выкл';
    }
    if (
      this.trackSelect &&
      this.trackSelect.value !== newState.sound.bgMusicTrack
    ) {
      this.trackSelect.value = newState.sound.bgMusicTrack;
    }
    if (this.nameInput && document.activeElement !== this.nameInput) {
      this.nameInput.value = newState.playerName || '';
    }
  };

  // ===== Render =====

  private renderTrackOptions(): string {
    const currentId = store.getState().sound.bgMusicTrack;
    return AUDIO_TRACKS.map(
      (t) =>
        `<option value="${t.id}" ${t.id === currentId ? 'selected' : ''}>${t.name}</option>`,
    ).join('');
  }

  private renderBgOptions(): string {
    const currentId = store.getState().selectedThemeId || DEFAULT_BACKGROUND_ID;
    return BACKGROUNDS.map(
      (bg) => `
      <label class="bg-option">
        <input
          type="radio"
          name="bgChoice"
          value="${bg.id}"
          ${bg.id === currentId ? 'checked' : ''}
          class="visually-hidden" />
        <div class="bg-option__preview bg-option__preview--${bg.id}"></div>
        <span class="bg-option__name">${bg.name}</span>
      </label>
    `,
    ).join('');
  }

  render(): string {
    return `
      <div data-header-slot></div>
      <main class="page settings-page">
        <section class="parchment parchment--long parchment--settings">
          <img
            class="parchment__bg"
            src="./img/parchment/Parchment-curved-long.png"
            alt=""
            aria-hidden="true" />
          <div class="parchment__seal" aria-hidden="true"></div>

          <div class="parchment__content">
            <h1 class="settings-title">Настройки</h1>

            <div class="settings-form">
              <div class="settings-group">
                <label for="settingsCharName" class="settings-label">Имя персонажа</label>
                <div class="input-group">
                  <input
                    type="text"
                    id="settingsCharName"
                    class="input-field input-field--parchment"
                    value=""
                    minlength="2"
                    maxlength="15"
                    autocomplete="off"
                    aria-describedby="settingsNameError"
                    aria-invalid="false" />
                  <p class="error-message" id="settingsNameError" aria-live="polite" hidden>
                    Имя должно быть от 2 до 15 символов
                  </p>
                </div>
              </div>

              <div class="settings-group settings-group--inline">
                <label for="settingsMusicVolume" class="settings-label">Громкость</label>
                <input
                  type="range"
                  id="settingsMusicVolume"
                  class="settings-slider"
                  min="0"
                  max="100"
                  value="50" />
                <span id="settingsVolumeValue" class="settings-value">50%</span>
              </div>

              <div class="settings-music-row">
                <span class="settings-label">Музыка</span>
                <button type="button" class="btn-mute" data-action="toggle-mute">Выкл</button>

                <span class="settings-label">Трек</span>
                <select id="settingsTrack" class="select-track">
                  ${this.renderTrackOptions()}
                </select>
              </div>

              <div class="settings-group" role="group" aria-labelledby="bg-label">
                <div id="bg-label" class="settings-label">Выберите фон</div>
                <div class="bg-options">
                  ${this.renderBgOptions()}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    `;
  }
}
