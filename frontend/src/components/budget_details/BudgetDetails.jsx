import React from "react";

const ProgressBar = ({ label, spent, budget, remaining }) => {
  const spentNum = Number(spent);
  const budgetNum = Number(budget);
  const remainingNum = Number(remaining);

  const percent = Math.min((spentNum / budgetNum) * 100, 100);
  const isProgressBarFull = percent >= 100;

  return (
    <div className="mb-6">
      <div className="flex justify-between">
        <strong>{label}</strong>
        <span>
          ${spentNum} / ${budgetNum}
        </span>
      </div>

      <div className="w-full bg-base-200 rounded-full h-3 my-2 overflow-hidden">
        <div
          className={`h-3 transition-all duration-300 ${isProgressBarFull ? "bg-error" : "bg-accent"}`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <p className="text-sm text-base-content/70">Remaining: ${remainingNum}</p>
    </div>
  );
};

const BudgetDetails = ({ data }) => {
  const categories = [
    {
      label: "Needs",
      spent: data.needs_spent,
      budget: data.needs_budget,
      remaining: data.needs_remaining,
    },
    {
      label: "Wants",
      spent: data.wants_spent,
      budget: data.wants_budget,
      remaining: data.wants_remaining,
    },
    {
      label: "Savings",
      spent: data.savings_spent,
      budget: data.savings_budget,
      remaining: data.savings_remaining,
    },
  ];

  return (
    <div className="w-full p-8 border rounded-lg bg-base-200 hover:border-secondary">
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
