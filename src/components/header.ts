import { Component } from '../core/component';
import { router } from '../core/router';

export class Header extends Component {
  private unsubscribe: (() => void) | null = null;

  constructor() {
    super({
      tagName: 'header',
      className: 'top-bar',
    });
  }

  onMount(): void {
    this.unsubscribe = router.subscribe((path) => {
      this.updateActiveClass(path);
    });
  }

  onUnmount(): void {
    this.unsubscribe?.();
  }

  private updateActiveClass(currPath: string): void {
    const links = this.element.querySelectorAll<HTMLElement>('.nav-link');

    links.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const linkPath = href.replace(/^#/, '') || '/';

      const isActive =
        currPath === linkPath ||
        (linkPath !== '/' && currPath.startsWith(`${linkPath}/`));

      link.classList.toggle('active', isActive);
    });
  }

  render(): string {
    return `
      <nav class="nav">
        <a class="nav-link" href="#/home" data-link>Главная</a>
        <a class="nav-link" href="#/character" data-link>Персонаж</a>
        <a class="nav-link" href="#/settings" data-link>Настройки</a>
        <a class="nav-link" href="#/rules" data-link>Свод правил</a>
      </nav>
    `;
  }
}
