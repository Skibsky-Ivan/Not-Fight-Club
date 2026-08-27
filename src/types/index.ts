// ============ store ==============
export interface BattleHistoryEntry {
  id: string;
  opponentName: string;
  result: BattleOutcomeType;
  date: string;
}

export interface GameStats {
  totalBattles: number;
  wins: number;
  losses: number;
  draws: number;
  history: BattleHistoryEntry[];
}

export interface SoundSettings {
  bgMusicTrack: string;
  musicVolume: number;
  isMuted: boolean;
}

export interface GlobalState {
  playerName: string;
  selectedAvatarId: string;
  selectedThemeId: string;
  sound: SoundSettings;
  stats: GameStats;
}

// =========== battle ==============
export interface AttackDetail {
  zone: string;
  isCritical: boolean;
}

export interface FighterInput {
  name: string;
  attackZones: AttackDetail[];
  defenseZones: string[];
  baseDamage: number;
  critMultiplier: number;
}

export interface LogEntry {
  attacker: string;
  target: string;
  zone: string;
  damage: number;
  isCritical: boolean;
  isBlocked: boolean;
}

export type RoundData = LogEntry[];

export interface BattleResultRound {
  logs: RoundData;
  playerDamageTaken: number;
  opponentDamageTaken: number;
}

export interface GameState {
  playerHp: number;
  opponentHp: number;
  logs: RoundData;
}

// ============= data ================
export interface FighterProfile {
  id: string;
  name: string;
  description: string;
  avatar: string;
  attackZonesCount: number;
  defenseZonesCount: number;
  baseDamage: number;
  critChance: number;
  critMultiplier: number;
  hp: number;
}

export interface BackgroundOption {
  id: string;
  name: string;
  path: string;
}

export interface OutcomeText {
  main: string;
  sub: string;
}

export type LocationType = 'forest' | 'fortress' | 'citadel';
export type BattleOutcomeType = 'win' | 'loss' | 'draw';

export interface StartPhrase {
  forest: string[];
  fortress: string[];
  citadel: string[];
}

export interface EndOutcomePhrases {
  win: string[];
  loss: string[];
  draw: string[];
}

export interface EndPhrases {
  forest: EndOutcomePhrases;
  fortress: EndOutcomePhrases;
  citadel: EndOutcomePhrases;
}

export interface AudioTrack {
  id: string;
  name: string;
  path: string;
}
