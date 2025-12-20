import copy
import random

class Hat:
    def __init__(self, **balls):
        self.contents = []
        for color, count in balls.items():
            self.contents.extend([color] * count)

    def draw(self, count):
        if count >= len(self.contents):
            drawn = list(self.contents)
            self.contents.clear()
            return drawn
        drawn = []
        for _ in range(count):
            idx = random.randrange(len(self.contents))
            drawn.append(self.contents.pop(idx))
        return drawn


def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
    success_count = 0

    for _ in range(num_experiments):
        hat_copy = copy.deepcopy(hat)
        drawn = hat_copy.draw(num_balls_drawn)

        drawn_counts = {}
        for b in drawn:
            drawn_counts[b] = drawn_counts.get(b, 0) + 1

        match = True
        for color, needed in expected_balls.items():
            if drawn_counts.get(color, 0) < needed:
                match = False
                break

        if match:
            success_count += 1

    return success_count / num_experiments
