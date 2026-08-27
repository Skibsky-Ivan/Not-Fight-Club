export const STORAGE_KEYS = {
  GLOBAL: 'game_global_state',
  BATTLE: 'game_battle_state',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

export function loadData<T>(key: StorageKey, defaultData: T): T {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultData;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(
      `Ошибка чтения ${key} из localStorage, применены дефолтные настройки:`,
      error,
    );
    return defaultData;
  }
}

export function saveData<T>(key: StorageKey, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Ошибка записи ${key} в localStorage:`, error);
  }
}

export function clearData(key: StorageKey): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Ошибка удаления ${key} из localStorage:`, error);
  }
}

export function clearAllGameData(): void {
  Object.values(STORAGE_KEYS).forEach(clearData);
}
