import { Component } from '../core/component';
import { router } from '../core/router';
import { clearData, STORAGE_KEYS } from '../storage/local-storage';

export class HomeScreen extends Component {
  constructor() {
    super({
      tagName: 'main',
      className: 'page home-page',
    });
  }

  // ===== Lifecycle =====

  onMount(): void {
    this.element.addEventListener('click', this.handleClick);
  }

  onUnmount(): void {
    this.element.removeEventListener('click', this.handleClick);
  }

  // ===== Handlers =====

  private handleClick = (e: MouseEvent): void => {
    const startBtn = (e.target as HTMLElement).closest<HTMLElement>(
      '[data-action="start-battle"]',
    );
    if (!startBtn) return;

    e.preventDefault();
    clearData(STORAGE_KEYS.BATTLE);
    router.navigate('/battle');
  };

  // ===== Render =====

  render(): string {
    return `
      <section class="parchment parchment--long parchment--menu">
        <img
          class="parchment__bg"
          src="./img/parchment/Parchment-curved-long.png"
          alt=""
          aria-hidden="true" />

        <div class="parchment__seal" aria-hidden="true"></div>

        <div class="parchment__content">
          <h1 class="home-title">Средневековые войны</h1>

          <nav class="home-nav" aria-label="Главное меню">
            <ul class="home-nav__list">
              <li class="home-nav__item">
                <a
                  href="#/battle"
                  class="btn btn--main-menu"
                  data-action="start-battle">
                  в бой
                </a>
              </li>
              <li class="home-nav__item">
                <a href="#/character" class="btn btn--main-menu" data-link>
                  Персонаж
                </a>
              </li>
              <li class="home-nav__item">
                <a href="#/settings" class="btn btn--main-menu" data-link>
                  Настройки
                </a>
              </li>
              <li class="home-nav__item">
                <a href="#/rules" class="btn btn--main-menu" data-link>
                  Правила
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    `;
  }
}
