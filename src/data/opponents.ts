import { FighterProfile } from '../types';

export const OPPONENTS: FighterProfile[] = [
  {
    id: 'black-eyed-bruno',
    name: 'Черноглазый Бруно',
    description:
      'Лесной разбойник с капюшоном и стрелами. Атакует сразу из двух позиций и часто критует.',
    avatar: './img/robbers/Black-Eyed-Bruno.png',
    attackZonesCount: 2,
    defenseZonesCount: 1,
    baseDamage: 24,
    critChance: 25,
    critMultiplier: 1.6,
    hp: 85,
  },
  {
    id: 'gareth-red-scarf',
    name: 'Гарет Красный Шарф',
    description:
      'Свободный наемник с тяжелой булавой. Защищает 3 зоны одновременно, пробить его трудно.',
    avatar: './img/robbers/Gareth-the-Red-Scarf.png',
    attackZonesCount: 1,
    defenseZonesCount: 3,
    baseDamage: 25,
    critChance: 10,
    critMultiplier: 1.5,
    hp: 110,
  },
  {
    id: 'grim-silas',
    name: 'Мрачный Сайлас',
    description:
      'Угрюмый бывший стражник. Предпочитает классическую стойку и выверенные контратаки.',
    avatar: './img/robbers/Grim-Silas.png',
    attackZonesCount: 1,
    defenseZonesCount: 2,
    baseDamage: 28,
    critChance: 15,
    critMultiplier: 1.5,
    hp: 100,
  },
  {
    id: 'jack-cutthroat',
    name: 'Джек Головорез',
    description:
      'Безумный головорез. Не заботится о собственной защите, делая ставку на максимальный урон.',
    avatar: './img/robbers/Jack-the-Cutthroat.png',
    attackZonesCount: 2,
    defenseZonesCount: 1,
    baseDamage: 32,
    critChance: 20,
    critMultiplier: 1.8,
    hp: 100,
  },
  {
    id: 'jacques-rogue',
    name: 'Жак Плут',
    description:
      'Бывший дуэлянт, ставший разбойником. Наносит быстрые выпады с огромным шансом крита.',
    avatar: './img/robbers/Jacques-the-Rogue.png',
    attackZonesCount: 1,
    defenseZonesCount: 2,
    baseDamage: 22,
    critChance: 35,
    critMultiplier: 1.5,
    hp: 90,
  },
  {
    id: 'sly-barnaby',
    name: 'Хитрый Барнаби',
    description:
      'Хитрый вымогатель. Выжидает ошибки игрока за глухой защитой и наносит редкие уколы.',
    avatar: './img/robbers/Sly-Barnaby.png',
    attackZonesCount: 1,
    defenseZonesCount: 3,
    baseDamage: 18,
    critChance: 15,
    critMultiplier: 2.0,
    hp: 105,
  },
];

export function getRandomOpponent(): FighterProfile {
  return OPPONENTS[Math.floor(Math.random() * OPPONENTS.length)];
}

export function getOpponentById(id: string): FighterProfile | undefined {
  return OPPONENTS.find((o) => o.id === id);
}
