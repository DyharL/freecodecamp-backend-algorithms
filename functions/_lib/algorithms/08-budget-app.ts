/**
 * freeCodeCamp Scientific Computing Project 03: Budget App
 * Object-oriented financial ledger and ASCII percentage spend distribution chart.
 */

export interface LedgerEntry {
  amount: number;
  description: string;
}

export class Category {
  public name: string;
  public ledger: LedgerEntry[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public deposit(amount: number, description: string = ''): void {
    this.ledger.push({ amount, description });
  }

  public withdraw(amount: number, description: string = ''): boolean {
    if (this.check_funds(amount)) {
      this.ledger.push({ amount: -amount, description });
      return true;
    }
    return false;
  }

  public get_balance(): number {
    return this.ledger.reduce((acc, entry) => acc + entry.amount, 0);
  }

  public transfer(amount: number, target: Category): boolean {
    if (this.check_funds(amount)) {
      this.withdraw(amount, `Transfer to ${target.name}`);
      target.deposit(amount, `Transfer from ${this.name}`);
      return true;
    }
    return false;
  }

  public check_funds(amount: number): boolean {
    return amount <= this.get_balance();
  }

  public get_withdrawals(): number {
    return this.ledger
      .filter((entry) => entry.amount < 0 && !entry.description.startsWith('Transfer to'))
      .reduce((acc, entry) => acc + Math.abs(entry.amount), 0);
  }

  public toString(): string {
    const totalLength = 30;
    const asterisks = totalLength - this.name.length;
    const leftAsterisks = Math.floor(asterisks / 2);
    const rightAsterisks = asterisks - leftAsterisks;
    let title = '*'.repeat(leftAsterisks) + this.name + '*'.repeat(rightAsterisks);

    const items: string[] = [];
    for (const entry of this.ledger) {
      const desc = entry.description.slice(0, 23).padEnd(23, ' ');
      const amt = entry.amount.toFixed(2).padStart(7, ' ');
      items.push(`${desc}${amt}`);
    }

    const total = `Total: ${this.get_balance().toFixed(2)}`;
    return [title, ...items, total].join('\n');
  }
}

export function createSpendChart(categories: Category[]): string {
  // Compute individual spends (all withdrawals)
  const spends = categories.map((cat) => {
    return cat.ledger
      .filter((e) => e.amount < 0)
      .reduce((sum, e) => sum + Math.abs(e.amount), 0);
  });

  const totalSpend = spends.reduce((sum, s) => sum + s, 0);
  const percentages = spends.map((s) => (totalSpend === 0 ? 0 : Math.floor((s / totalSpend) * 10) * 10));

  let chart = 'Percentage spent by category\n';

  for (let level = 100; level >= 0; level -= 10) {
    chart += level.toString().padStart(3, ' ') + '|';
    for (const p of percentages) {
      chart += p >= level ? ' o ' : '   ';
    }
    chart += ' \n';
  }

  // Dash separator
  chart += '    ' + '-'.repeat(categories.length * 3 + 1) + '\n';

  // Vertical labels
  const maxNameLength = Math.max(...categories.map((c) => c.name.length));
  for (let i = 0; i < maxNameLength; i++) {
    chart += '    ';
    for (const c of categories) {
      chart += i < c.name.length ? ` ${c.name[i]} ` : '   ';
    }
    chart += ' ';
    if (i !== maxNameLength - 1) {
      chart += '\n';
    }
  }

  return chart;
}
