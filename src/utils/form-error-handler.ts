export class FormErrorHandler {
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private errorEl: HTMLElement,
    private inputEl: HTMLInputElement,
  ) {}

  show(message: string, duration = 3000): void {
    this.clear();
    this.errorEl.textContent = message;
    this.errorEl.hidden = false;
    this.inputEl.setAttribute('aria-invalid', 'true');

    this.timeoutId = setTimeout(() => {
      this.hide();
    }, duration);
  }

  hide(): void {
    this.errorEl.hidden = true;
    this.inputEl.setAttribute('aria-invalid', 'false');
  }

  clear(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
}
