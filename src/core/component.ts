export type ComponentProps = Record<string, any>;
export type ComponentState = Record<string, any>;

export interface ComponentOptions {
  tagName?: string;
  className?: string;
  dataset?: Record<string, string>;
  attributes?: Record<string, string>;
  props?: ComponentProps;
}

export class Component {
  props: ComponentProps;
  state: ComponentState;
  element: HTMLElement;
  private placeholder: HTMLElement | null = null;

  constructor(options: ComponentOptions = {}) {
    const {
      tagName = 'div',
      className = '',
      dataset = {},
      attributes = {},
      props = {},
    } = options;

    this.props = props;
    this.state = {};

    this.element = document.createElement(tagName);
    if (className) this.element.className = className;
    if (dataset) Object.assign(this.element.dataset, dataset);
    for (const [key, value] of Object.entries(attributes)) {
      this.element.setAttribute(key, value);
    }
  }

  setState(newState: ComponentState): void {
    const prevState: ComponentState = { ...this.state };
    this.state = { ...prevState, ...newState };
    this.onStateChanges(prevState, this.state);
    this.update();
  }

  onStateChanges(prevState: ComponentState, newState: ComponentState): void {}
  onMount(): void {}
  onUnmount(): void {}

  render(): string {
    return '';
  }

  update(): void {
    this.element.innerHTML = this.render();
    this.afterRender();
  }

  afterRender(): void {}

  mount(container: HTMLElement): void {
    this.placeholder = container;
    this.update();
    container.replaceWith(this.element);
    this.onMount();
  }

  unmount(): void {
    this.onUnmount();
    if (this.element.isConnected) {
      if (this.placeholder) {
        this.element.replaceWith(this.placeholder);
      } else {
        this.element.remove();
      }
    }
    this.placeholder = null;
  }
}
