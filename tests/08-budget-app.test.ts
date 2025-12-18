import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { Category, createSpendChart } from '../src/algorithms/08-budget-app.js';

describe('Algorithm 08: Budget App', () => {
  it('manages deposits, withdrawals, balances and transfers', () => {
    const food = new Category('Food');
    const entertainment = new Category('Entertainment');

    food.deposit(1000, 'initial deposit');
    assert.equal(food.get_balance(), 1000);

    const withdrawSuccess = food.withdraw(10.15, 'groceries');
    assert.equal(withdrawSuccess, true);
    assert.equal(food.get_balance(), 989.85);

    const transferSuccess = food.transfer(50, entertainment);
    assert.equal(transferSuccess, true);
    assert.equal(food.get_balance(), 939.85);
    assert.equal(entertainment.get_balance(), 50);

    const failWithdraw = entertainment.withdraw(100, 'overdraft');
    assert.equal(failWithdraw, false);
    assert.equal(entertainment.get_balance(), 50);
  });

  it('formats ledger string representation cleanly', () => {
    const clothing = new Category('Clothing');
    clothing.deposit(100, 'paycheck');
    clothing.withdraw(25.5, 'shoes');
    const str = clothing.toString();

    assert(str.includes('Clothing'));
    assert(str.includes('paycheck'));
    assert(str.includes('100.00'));
    assert(str.includes('Total: 74.50'));
  });

  it('generates spend chart with percentage distribution', () => {
    const food = new Category('Food');
    const clothing = new Category('Clothing');
    const auto = new Category('Auto');

    food.deposit(1000, 'deposit');
    clothing.deposit(1000, 'deposit');
    auto.deposit(1000, 'deposit');

    food.withdraw(105.55, 'groceries');
    clothing.withdraw(33.4, 'shoes');
    auto.withdraw(14.33, 'fuel');

    const chart = createSpendChart([food, clothing, auto]);
    assert(chart.startsWith('Percentage spent by category'));
    assert(chart.includes('100|'));
    assert(chart.includes(' 90|'));
    assert(chart.includes('  0|'));
    assert(chart.includes('F  C  A'));
  });
});
