export function validatePlayerName(name: string): {
  valid: boolean;
  message: string;
} {
  const trimmed = name.trim();

  const regex = /^[a-zA-Zа-яА-ЯёЁ0-9_-\s]+$/;

  if (trimmed.length < 2 || trimmed.length > 15 || !regex.test(trimmed)) {
    return {
      valid: false,
      message: `От 2 до 15 символов. Допустимы буквы (русские и латинские), цифры, тире, подчёркивание и пробелы.`,
    };
  }

  return { valid: true, message: '' };
}
