/**
 * freeCodeCamp Scientific Computing Project 01: Arithmetic Formatter
 * Arranges vertical arithmetic problems with strict tabular alignment and optional solution lines.
 */

export function arithmeticArranger(problems: string[], showAnswers: boolean = false): string {
  if (problems.length > 5) {
    return 'Error: Too many problems.';
  }

  const topOperands: string[] = [];
  const bottomOperands: string[] = [];
  const dashLines: string[] = [];
  const answers: string[] = [];

  for (const problem of problems) {
    const parts = problem.trim().split(/\s+/);
    if (parts.length !== 3) {
      return "Error: Operator must be '+' or '-'.";
    }

    const [first, operator, second] = parts;

    if (operator !== '+' && operator !== '-') {
      return "Error: Operator must be '+' or '-'.";
    }

    if (!/^\d+$/.test(first) || !/^\d+$/.test(second)) {
      return 'Error: Numbers must only contain digits.';
    }

    if (first.length > 4 || second.length > 4) {
      return 'Error: Numbers cannot be more than four digits.';
    }

    const width = Math.max(first.length, second.length) + 2;
    topOperands.push(first.padStart(width, ' '));
    bottomOperands.push(operator + ' ' + second.padStart(width - 2, ' '));
    dashLines.push('-'.repeat(width));

    if (showAnswers) {
      const num1 = parseInt(first, 10);
      const num2 = parseInt(second, 10);
      const result = operator === '+' ? num1 + num2 : num1 - num2;
      answers.push(result.toString().padStart(width, ' '));
    }
  }

  const lines = [
    topOperands.join('    '),
    bottomOperands.join('    '),
    dashLines.join('    ')
  ];

  if (showAnswers) {
    lines.push(answers.join('    '));
  }

  return lines.join('\n');
}
