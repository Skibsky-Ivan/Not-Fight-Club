import { FighterInput, LogEntry, BattleResultRound } from '../types';

function resolveSingleAttack(
  attacker: FighterInput,
  defender: FighterInput,
): { damageDealt: number; logs: LogEntry[] } {
  let totalDamage = 0;
  const logs: LogEntry[] = [];

  for (const attack of attacker.attackZones) {
    const isBlocked = defender.defenseZones.includes(attack.zone);
    const isSuccessfulHit = !isBlocked || attack.isCritical;

    let hitDamage = 0;
    if (isSuccessfulHit) {
      const rawDamage = attack.isCritical
        ? attacker.baseDamage * attacker.critMultiplier
        : attacker.baseDamage;
      hitDamage = Math.round(rawDamage);
      totalDamage += hitDamage;
    }

    logs.push({
      attacker: attacker.name,
      target: defender.name,
      zone: attack.zone,
      damage: hitDamage,
      isCritical: attack.isCritical,
      isBlocked,
    });
  }

  return { damageDealt: totalDamage, logs };
}

export function resolveTurn(
  playerInput: FighterInput,
  opponentInput: FighterInput,
): BattleResultRound {
  const playerAttackResult = resolveSingleAttack(playerInput, opponentInput);
  const opponentAttackResult = resolveSingleAttack(opponentInput, playerInput);

  return {
    logs: [...playerAttackResult.logs, ...opponentAttackResult.logs],
    opponentDamageTaken: playerAttackResult.damageDealt,
    playerDamageTaken: opponentAttackResult.damageDealt,
  };
}

export function rollCrit(critChance: number): boolean {
  return Math.random() < critChance / 100;
}

export function getRandomZones(allZones: string[], count: number): string[] {
  const pool = [...allZones];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}
