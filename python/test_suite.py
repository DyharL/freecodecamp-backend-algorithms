import unittest
from arithmetic_arranger import arithmetic_arranger
from time_calculator import add_time
from budget import Category, create_spend_chart
from shape_calculator import Rectangle, Square
from prob_calculator import Hat, experiment

class TestScientificComputing(unittest.TestCase):
    def test_arithmetic_arranger(self):
        res = arithmetic_arranger(["32 + 698", "3801 - 2", "45 + 43", "123 + 49"])
        self.assertIn("32", res)
        self.assertIn("+ 698", res)

    def test_time_calculator(self):
        res = add_time("3:00 PM", "3:10")
        self.assertEqual(res, "6:10 PM")
        res_next = add_time("11:30 AM", "2:32", "Monday")
        self.assertEqual(res_next, "2:02 PM, Monday")

    def test_budget(self):
        food = Category("Food")
        food.deposit(1000, "initial deposit")
        food.withdraw(10.15, "groceries")
        self.assertEqual(food.get_balance(), 989.85)

    def test_shape(self):
        rect = Rectangle(10, 5)
        self.assertEqual(rect.get_area(), 50)
        sq = Square(5)
        self.assertEqual(sq.get_area(), 25)

    def test_probability(self):
        hat = Hat(black=6, red=4, green=3)
        prob = experiment(hat=hat, expected_balls={"red": 2, "green": 1}, num_balls_drawn=5, num_experiments=200)
        self.assertTrue(0 <= prob <= 1)

if __name__ == '__main__':
    unittest.main()
