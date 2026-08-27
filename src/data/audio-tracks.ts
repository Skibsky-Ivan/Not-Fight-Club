import { AudioTrack } from '../types';

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    id: 'Raise-Your-Mugs-High',
    name: 'Поднимайте кружки выше!',
    path: './sounds/background-tracks/Raise-Your-Mugs-High.mp3',
  },
  {
    id: 'Lively-Bard-Jig',
    name: 'Веселая джига барда',
    path: './sounds/background-tracks/Lively-Bard-Jig.mp3',
  },
  {
    id: 'The-Jolly-Tankard',
    name: 'Веселая кружка',
    path: './sounds/background-tracks/The-Jolly-Tankard.mp3',
  },
  {
    id: 'Medieval-Dance-Party',
    name: 'Средневековый танцевальный пир',
    path: './sounds/background-tracks/Medieval-Dance-Party.mp3',
  },
  {
    id: 'Pirate-Tavern-Riot',
    name: 'Бунт в пиратской таверне',
    path: './sounds/background-tracks/Pirate-Tavern-Riot.mp3',
  },
  {
    id: 'Tavern-Dance-Loop',
    name: 'Танец в таверне',
    path: './sounds/background-tracks/Tavern-Dance-Loop.mp3',
  },
];

export const DEFAULT_AUDIO_TRACK_ID = 'Tavern-Dance-Loop';

export function getTrackPath(id: string): string {
  return AUDIO_TRACKS.find((t) => t.id === id)?.path || AUDIO_TRACKS[0].path;
}
