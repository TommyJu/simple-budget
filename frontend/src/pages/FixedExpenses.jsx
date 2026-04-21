import ExpenseCard from "../components/cards/ExpenseCard";
import useFixedExpenseStore from "../store/fixed-expense/useFixedExpenseStore";
import { useEffect } from "react";

const FixedExpenses = () => {
  const { fixedExpenses, setFilter, currentFilter, getFixedExpenses } =
    useFixedExpenseStore();

  useEffect(() => {
    getFixedExpenses();
  }, [currentFilter]);

  return (
    <div className="flex flex-col items-center p-4 gap-8 h-dvh">
      <h2 className="text-4xl md:text-5xl px-4 text-primary indie-flower-regular">
        Fixed Expenses
      </h2>
      <button className="btn btn-primary btn-sm md:btn-md">
        + Create New Fixed Expense
      </button>
      {/* Category Filter */}

      <form className="filter" onReset={() => setFilter("all")}>
        {/* Reset → All */}
        <input className="btn btn-square" type="reset" value="×" title="All" />

        <input
          className="btn"
          type="radio"
          name="expense-filter"
          aria-label="Needs"
          checked={currentFilter === "needs"}
          onChange={() => setFilter("needs")}
        />

        <input
          className="btn"
          type="radio"
          name="expense-filter"
          aria-label="Wants"
          checked={currentFilter === "wants"}
          onChange={() => setFilter("wants")}
        />

        <input
          className="btn"
          type="radio"
          name="expense-filter"
          aria-label="Savings"
          checked={currentFilter === "savings"}
          onChange={() => setFilter("savings")}
        />
      </form>

      {/* Fixed Expenses */}
      <div className="w-full flex flex-col items-center gap-2">
        {fixedExpenses.map((expense) => (
          <ExpenseCard
            key={expense.id} // or _id depending on your DB
            amount={expense.amount}
            description={expense.description}
            createdAt={expense.created_at}
            category={expense.category}
          />
        ))}
      </div>
    </div>
  );
};

export default FixedExpenses;
