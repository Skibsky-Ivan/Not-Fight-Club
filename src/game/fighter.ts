export class Fighter {
  private hp: number;

  constructor(hp: number = 0) {
    this.hp = hp;
  }

  getHp(): number {
    return this.hp;
  }

  takeDamage(damage: number): void {
    if (damage <= 0) return;
    this.hp = Math.max(0, this.hp - damage);
  }

  isAlive(): boolean {
    return this.hp > 0;
  }
}
