import { arithmeticArranger } from '../../_lib/algorithms/06-arithmetic-formatter.ts';
import { addTime } from '../../_lib/algorithms/07-time-calculator.ts';
import { Category, createSpendChart } from '../../_lib/algorithms/08-budget-app.ts';
import { Rectangle, Square } from '../../_lib/algorithms/09-polygon-area-calculator.ts';
import { Hat, experiment } from '../../_lib/algorithms/10-probability-calculator.ts';

export const onRequest: PagesFunction = async (context) => {
  const algo = context.params.algo as string;
  const req = context.request;

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const body: any = await req.json().catch(() => ({}));

  if (algo === 'arithmetic') {
    const problems = body.problems || ['32 + 698', '3801 - 2', '45 + 43', '123 + 49'];
    return new Response(JSON.stringify({ result: arithmeticArranger(problems, true) }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  if (algo === 'time') {
    const output = addTime(body.start || '11:43 PM', body.duration || '24:20', body.startingDay || 'Tuesday');
    return new Response(JSON.stringify({ result: output }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  if (algo === 'budget') {
    const food = new Category('Food');
    const clothing = new Category('Clothing');
    const auto = new Category('Auto');
    food.deposit(1000, 'deposit');
    clothing.deposit(1000, 'deposit');
    auto.deposit(1000, 'deposit');
    food.withdraw(120, 'groceries');
    clothing.withdraw(60, 'jacket');
    auto.withdraw(30, 'fuel');
    return new Response(JSON.stringify({ chart: createSpendChart([food, clothing, auto]) }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  if (algo === 'polygon') {
    const rect = new Rectangle(12, 6);
    const sq = new Square(5);
    return new Response(JSON.stringify({
      rectangle: {
        area: rect.get_area(),
        perimeter: rect.get_perimeter(),
        diagonal: rect.get_diagonal(),
        squareFit: rect.get_amount_inside(sq)
      }
    }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  if (algo === 'probability') {
    const hat = new Hat({ blue: 4, red: 2, green: 6 });
    const prob = experiment(hat, { blue: 2, red: 1 }, 4, 500);
    return new Response(JSON.stringify({ probability: prob, trials: 500 }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  return new Response(JSON.stringify({ error: 'Unknown algorithm' }), { status: 404 });
};
