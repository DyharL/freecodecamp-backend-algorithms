class Category:
    def __init__(self, name):
        self.name = name
        self.ledger = []

    def deposit(self, amount, description=""):
        self.ledger.append({"amount": float(amount), "description": description})

    def withdraw(self, amount, description=""):
        if self.check_funds(amount):
            self.ledger.append({"amount": -float(amount), "description": description})
            return True
        return False

    def get_balance(self):
        return sum(item["amount"] for item in self.ledger)

    def transfer(self, amount, category):
        if self.check_funds(amount):
            self.withdraw(amount, f"Transfer to {category.name}")
            category.deposit(amount, f"Transfer from {self.name}")
            return True
        return False

    def check_funds(self, amount):
        return self.get_balance() >= amount

    def __str__(self):
        title = self.name.center(30, "*") + "\n"
        items = ""
        for item in self.ledger:
            desc = item["description"][:23].ljust(23)
            amt = f"{item['amount']:.2f}".rjust(7)
            items += f"{desc}{amt}\n"
        total = f"Total: {self.get_balance():.2f}"
        return title + items + total


def create_spend_chart(categories):
    spent = []
    for cat in categories:
        withdrawals = sum(-item["amount"] for item in cat.ledger if item["amount"] < 0)
        spent.append(withdrawals)

    total_spent = sum(spent)
    percentages = [int((s / total_spent) * 10) * 10 if total_spent > 0 else 0 for s in spent]

    chart = "Percentage spent by category\n"
    for level in range(100, -1, -10):
        chart += str(level).rjust(3) + "| "
        for p in percentages:
            chart += "o  " if p >= level else "   "
        chart += "\n"

    chart += "    " + "-" * (len(categories) * 3 + 1) + "\n"

    names = [cat.name for cat in categories]
    max_len = max(len(name) for name in names)
    for i in range(max_len):
        chart += "     "
        for name in names:
            chart += (name[i] + "  ") if i < len(name) else "   "
        if i < max_len - 1:
            chart += "\n"

    return chart
