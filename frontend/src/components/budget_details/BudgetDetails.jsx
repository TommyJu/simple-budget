import React from "react";

const ProgressBar = ({ label, spent, budget, remaining, percentage }) => {
  const spentNum = Number(spent);
  const budgetNum = Number(budget);
  const remainingNum = Number(remaining);

  const percent = Math.min((spentNum / budgetNum) * 100, 100);
  const isProgressBarFull = percent >= 100;
  const isOverBudget = remainingNum < 0;
  const displayAmount = Math.abs(remainingNum);

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <strong>
          {label}
          <span className="ml-2 text-sm text-base-content/60">
            ({percentage}%)
          </span>
        </strong>
        <span>
          ${spentNum} / ${budgetNum}
        </span>
      </div>

      <div className="w-full bg-base-300 rounded-full h-3 my-2 overflow-hidden">
        <div
          className={`h-3 transition-all duration-300 ${isProgressBarFull ? "bg-error" : "bg-accent"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <p
  className={`text-sm ${
    isOverBudget ? "text-error" : "text-base-content/70"
  }`}
>
  {isOverBudget
    ? `Over Budget: $${displayAmount}`
    : `Remaining: $${displayAmount}`}
</p>
    </div>
  );
};

const BudgetDetails = ({ data, onClick }) => {
  const categories = [
    {
      label: "Needs",
      percentage: data.needs_percentage,
      spent: data.needs_spent,
      budget: data.needs_budget,
      remaining: data.needs_remaining,
    },
    {
      label: "Wants",
      percentage: data.wants_percentage,
      spent: data.wants_spent,
      budget: data.wants_budget,
      remaining: data.wants_remaining,
    },
    {
      label: "Savings",
      percentage: data.savings_percentage,
      spent: data.savings_spent,
      budget: data.savings_budget,
      remaining: data.savings_remaining,
    },
  ];

  return (
    <div
      onClick={onClick}
      className="w-full p-8 border rounded-lg bg-base-200 hover:border-secondary"
    >
      <div className="mb-8 text-xl">
        <strong>Estimated Income:</strong> ${data.income}
      </div>

      {categories.map((cat) => (
        <ProgressBar key={cat.label} {...cat} />
      ))}
    </div>
  );
};

export default BudgetDetails;
