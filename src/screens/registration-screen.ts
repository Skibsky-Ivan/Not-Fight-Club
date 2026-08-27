import { Component } from '../core/component';
import { router } from '../core/router';
import { store } from '../core/store';
import { validatePlayerName } from '../utils/validation';
import { FormErrorHandler } from '../utils/form-error-handler';

export class RegistrationScreen extends Component {
  private errorHandler: FormErrorHandler | null = null;
  private form: HTMLFormElement | null = null;
  private input: HTMLInputElement | null = null;

  constructor() {
    super({
      tagName: 'main',
      className: 'page registration-page',
    });
  }

  // ===== Lifecycle =====

  onMount(): void {
    if (store.getState().playerName) {
      router.navigate('/home');
      return;
    }

    this.form =
      this.element.querySelector<HTMLFormElement>('#registrationForm');
    this.input =
      this.element.querySelector<HTMLInputElement>('#playerNameInput');
    const errorEl = this.element.querySelector<HTMLElement>('#nameError');

    if (!this.form || !this.input || !errorEl) return;

    this.errorHandler = new FormErrorHandler(errorEl, this.input);

    this.form.addEventListener('submit', this.handleSubmit);
    this.input.addEventListener('input', this.handleInput);
  }

  onUnmount(): void {
    this.form?.removeEventListener('submit', this.handleSubmit);
    this.input?.removeEventListener('input', this.handleInput);
    this.errorHandler?.clear();
    this.errorHandler = null;
  }

  // ===== Handlers =====

  private handleSubmit = (e: SubmitEvent): void => {
    e.preventDefault();
    this.errorHandler?.clear();

    if (!this.input) return;

    const name = this.input.value.trim();
    const validation = validatePlayerName(name);

    if (!validation.valid) {
      this.errorHandler?.show(validation.message);
      return;
    }

    store.setState({ playerName: name });
    router.navigate('/home');
  };

  private handleInput = (): void => {
    this.errorHandler?.hide();
    this.errorHandler?.clear();
  };

  // ===== Render =====

  render(): string {
    return `
      <section class="parchment parchment--long parchment--registration">
        <img
          class="parchment__bg"
          src="./img/parchment/Parchment-curved-long.png"
          alt=""
          aria-hidden="true" />

        <div class="parchment__seal" aria-hidden="true"></div>

        <div class="parchment__content">
          <h1 class="registration-title">Средневековые войны</h1>

          <form class="registration-form" id="registrationForm" novalidate>
            <div class="input-group">
              <label for="playerNameInput" class="visually-hidden">
                Имя бойца
              </label>
              <input
                type="text"
                class="input-field input-field--parchment"
                id="playerNameInput"
                name="playerName"
                placeholder="Введи имя своего бойца..."
                minlength="2"
                maxlength="15"
                required
                autocomplete="off"
                data-input="player-name"
                aria-describedby="nameError"
                aria-invalid="false" />
              <p class="error-message" id="nameError" aria-live="polite" hidden>
                От 2 до 15 символов. Допустимы буквы (русские и латинские), цифры, тире, пробел и подчёркивание.
              </p>
            </div>

            <button type="submit" class="btn btn--registration">ВПЕРЁД</button>
          </form>
        </div>
      </section>
    `;
  }
}
