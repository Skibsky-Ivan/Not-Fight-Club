import { FighterProfile } from '../types';

export const KNIGHTS: FighterProfile[] = [
  {
    id: 'brandon-the-flayed',
    name: 'Брэндон Содранный',
    description:
      'Могучий рыцарь ордена, облаченный в кольчугу и закаленную сталь. Наводит ужас на врагов.',
    avatar: './img/knights/Brandon-the-Flayed.png',
    attackZonesCount: 2,
    defenseZonesCount: 2,
    baseDamage: 30,
    critChance: 15,
    critMultiplier: 1.5,
    hp: 100,
  },
  {
    id: 'baron-godfrey',
    name: 'Барон Годфри Эллсворт',
    description:
      'Опытный тактик и феодал. Предпочитает глухую оборону и выверенные точечные выпады.',
    avatar: './img/knights/Baron-Godfrey-Ellsworth.png',
    attackZonesCount: 1,
    defenseZonesCount: 3,
    baseDamage: 25,
    critChance: 10,
    critMultiplier: 1.5,
    hp: 110,
  },
  {
    id: 'cormac-the-tracker',
    name: 'Кормак Следопыт',
    description:
      'Закаленный в походах следопыт со щитом. Обладает высоким запасом здоровья и стойкостью.',
    avatar: './img/knights/Cormac-the-Tracker.png',
    attackZonesCount: 1,
    defenseZonesCount: 3,
    baseDamage: 22,
    critChance: 20,
    critMultiplier: 1.6,
    hp: 120,
  },
  {
    id: 'sir-osmund',
    name: 'Сэр Осмунд Ржавый',
    description:
      'Ветеран множества турниров. Его латы потемнели от времени, но тяжелый удар всё так же опасен.',
    avatar: './img/knights/Sir-Osmund-the-Rusty-Mac.png',
    attackZonesCount: 2,
    defenseZonesCount: 1,
    baseDamage: 35,
    critChance: 10,
    critMultiplier: 1.5,
    hp: 115,
  },
  {
    id: 'sir-roderick',
    name: 'Сэр Родерик',
    description:
      'Благородный чемпион в закрытом шлеме. Мастер сокрушительных критических ударов.',
    avatar: './img/knights/Sir-Roderick-Ironjaw.png',
    attackZonesCount: 1,
    defenseZonesCount: 2,
    baseDamage: 26,
    critChance: 30,
    critMultiplier: 1.8,
    hp: 95,
  },
  {
    id: 'sir-walter',
    name: 'Сэр Уолтер Серый',
    description:
      'Скромный рыцарь в кольчужном капюшоне. Универсальный боец с хорошим балансом характеристик.',
    avatar: './img/knights/Sir-Walter-the-Grey.png',
    attackZonesCount: 1,
    defenseZonesCount: 2,
    baseDamage: 28,
    critChance: 15,
    critMultiplier: 1.5,
    hp: 100,
  },
];

export const DEFAULT_KNIGHT_ID = 'brandon-the-flayed';

export function getKnightById(id: string): FighterProfile {
  return KNIGHTS.find((k) => k.id === id) || KNIGHTS[0];
}
