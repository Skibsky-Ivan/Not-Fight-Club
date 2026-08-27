import { store } from '../core/store';

export function initTheme(): () => void {
  function applyTheme(themeId: string): void {
    document.documentElement.dataset.theme = themeId;
  }

  applyTheme(store.getState().selectedThemeId);

  return store.subscribe((state) => {
    applyTheme(state.selectedThemeId);
  });
}
