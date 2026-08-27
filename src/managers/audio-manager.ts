import { store } from '../core/store';
import { getTrackPath } from '../data/audio-tracks';
import type { SoundSettings } from '../types';

export function initAudio(): () => void {
  const audio = new Audio();
  audio.loop = true;

  let hasInteracted = false;
  let currentTrackId = '';

  function applySound(sound: SoundSettings): void {
    const path = getTrackPath(sound.bgMusicTrack);

    if (currentTrackId !== sound.bgMusicTrack) {
      currentTrackId = sound.bgMusicTrack;
      audio.src = path;
      audio.load();
    }

    audio.volume = sound.musicVolume / 100;
    audio.muted = sound.isMuted;

    if (!hasInteracted) return;

    if (sound.isMuted) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }

  function unlockAudio(): void {
    if (hasInteracted) return;
    hasInteracted = true;
    if (!store.getState().sound.isMuted) {
      audio.play().catch(() => {});
    }
  }

  applySound(store.getState().sound);

  const unsubscribe = store.subscribe((state) => {
    applySound(state.sound);
  });

  const events = ['click', 'keydown', 'touchstart'] as const;
  const listeners = events.map((type) => {
    const handler = () => unlockAudio();
    document.addEventListener(type, handler, { once: true });
    return { type, handler };
  });

  return () => {
    unsubscribe();
    audio.pause();
    audio.src = '';
    listeners.forEach(({ type, handler }) => {
      document.removeEventListener(type, handler);
    });
  };
}
