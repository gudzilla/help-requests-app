import { notification } from './notifications';

export const copyToClipbord = async (text: string) => {
  try {
    await window.navigator.clipboard.writeText(text);
    notification('Скопировно');
  } catch (err) {
    console.error('Ошибка копирования в буфер обмена', err);
    notification('Ошибка копирования');
  }
};
