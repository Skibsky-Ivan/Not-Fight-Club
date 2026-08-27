import { BackgroundOption } from '../types';

export const BACKGROUNDS: BackgroundOption[] = [
  {
    id: 'citadel',
    name: 'Цитадель',
    path: './img/backgrounds/citadel.png',
  },
  {
    id: 'fortress',
    name: 'Крепость',
    path: './img/backgrounds/fortress.png',
  },
  {
    id: 'forest',
    name: 'Тёмный лес',
    path: './img/backgrounds/forest.png',
  },
];

export const DEFAULT_BACKGROUND_ID = 'citadel';

export const getBackgroundPath = (id: string): string => {
  const bg = BACKGROUNDS.find((b) => b.id === id);
  return bg ? bg.path : BACKGROUNDS[0].path;
};
