import { Component } from '../core/component';
import { router } from '../core/router';

export class NotFoundScreen extends Component {
  constructor() {
    super({
      tagName: 'main',
      className: 'page not-found-page',
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
    const btn = (e.target as HTMLElement).closest<HTMLElement>(
      '[data-action="go-home"]',
    );
    if (!btn) return;

    e.preventDefault();
    router.navigate('/home');
  };

  // ===== Render =====

  render(): string {
    return `
      <div class="not-found__bg" aria-hidden="true"></div>

      <div class="not-found__content">
        <h1 class="not-found__code">ОШИБКА 404</h1>
        <p class="not-found__title">СТРАНИЦА НЕ НАЙДЕНА.</p>
        <p class="not-found__subtitle">ВАШ ПУТЬ ПРИВЕЛ В НИКУДА.</p>

        <button
          type="button"
          class="btn btn--not-found"
          data-action="go-home">
          ВЕРНУТЬСЯ НА ГЛАВНУЮ
        </button>
      </div>
    `;
  }
}
