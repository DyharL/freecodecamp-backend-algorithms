/**
 * freeCodeCamp Scientific Computing Project 05: Probability Calculator
 * Stochastic Monte Carlo simulation estimating empirical probabilities of ball draws.
 */

export class Hat {
  public contents: string[] = [];

  constructor(balls: Record<string, number>) {
    for (const [color, count] of Object.entries(balls)) {
      for (let i = 0; i < count; i++) {
        this.contents.push(color);
      }
    }
  }

  public draw(num: number): string[] {
    if (num >= this.contents.length) {
      const drawnAll = [...this.contents];
      this.contents = [];
      return drawnAll;
    }

    const drawn: string[] = [];
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * this.contents.length);
      const [ball] = this.contents.splice(randomIndex, 1);
      drawn.push(ball);
    }
    return drawn;
  }
}

export function experiment(
  hat: Hat,
  expected_balls: Record<string, number>,
  num_balls_drawn: number,
  num_experiments: number
): number {
  let successfulExperiments = 0;

  for (let exp = 0; exp < num_experiments; exp++) {
    // Clone hat contents for isolated experiment trial
    const trialHat = new Hat({});
    trialHat.contents = [...hat.contents];

    const drawnBalls = trialHat.draw(num_balls_drawn);

    // Count occurrences of drawn balls
    const drawnCounts: Record<string, number> = {};
    for (const ball of drawnBalls) {
      drawnCounts[ball] = (drawnCounts[ball] || 0) + 1;
    }

    // Verify if all expected balls were matched
    let match = true;
    for (const [color, expectedCount] of Object.entries(expected_balls)) {
      if ((drawnCounts[color] || 0) < expectedCount) {
        match = false;
        break;
      }
    }

    if (match) {
      successfulExperiments++;
    }
  }

  return successfulExperiments / num_experiments;
}
