import { Component } from '../core/component';
import { Header } from '../components/header';

export class RulesScreen extends Component {
  private header: Header | null = null;

  constructor() {
    super({
      tagName: 'div',
      className: 'rules-wrapper',
    });
  }

  // ===== Lifecycle =====

  onMount(): void {
    this.initHeader();
  }

  onUnmount(): void {
    this.header?.unmount();
  }

  // ===== Setup =====

  private initHeader(): void {
    const slot = this.element.querySelector('[data-header-slot]');
    if (!slot) return;

    this.header = new Header();
    this.header.mount(slot as HTMLElement);
  }

  // ===== Render =====

  render(): string {
    return `
      <div data-header-slot></div>
      <main class="page rules-page">
        <section class="parchment parchment--long parchment--rules">
          <img
            class="parchment__bg"
            src="./img/parchment/Parchment-curved-long.png"
            alt=""
            aria-hidden="true" />

          <div class="parchment__seal" aria-hidden="true"></div>

          <div class="parchment__content">
            <h1 class="rules-title">Свод Правил</h1>

            <div class="rules-content-wrapper">
              <article class="rules-section">
                <h2 class="rules-section__title">1. Боевая система</h2>
                <p>
                  Каждый ход разворачивается одновременно! Выбирай
                  <strong>1 зону для атаки</strong> и
                  <strong>2 зоны для защиты</strong>. Пока зоны не выбраны — удар нанести невозможно.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">2. Расчет Урона</h2>
                <p>
                  Удар наносит урон только в том случае, если противник
                  <strong>не заблокировал</strong> эту зону. Если твоя атака и
                  защита врага совпали — урон блокируется.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">3. Профили Противников</h2>
                <p>
                  Разные враги имеют уникальные стили боя! Некоторые способны
                  атаковать 2 зоны за раз, но слабее защищаются, другие —
                  наоборот. Изучай тактику противника, чтобы предугадать его ход.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">4. Критические Удары</h2>
                <p>
                  Случайный критический удар наносит
                  <strong>x1.5 урона</strong> и
                  <span class="rules-section__highlight">пробивает любой блок</span>!
                  Даже если враг защищал эту зону, критический урон всё равно
                  достигнет цели.
                </p>
              </article>

              <article class="rules-section">
                <h2 class="rules-section__title">5. Справочная Информация</h2>
                <p>
                  Во время боя наведи курсор на <strong>имя бойца</strong> (игрока или противника)
                  в его карточке — появится всплывающая подсказка с полной статистикой:
                  текущее и максимальное здоровье, количество зон атаки и защиты,
                  базовый урон, шанс крита и множитель.
                </p>
              </article>
            </div>

            <a href="#/home" class="btn btn--rules-back" data-link>В главное меню</a>
          </div>
        </section>
      </main>
    `;
  }
}
