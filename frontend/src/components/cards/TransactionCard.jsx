const TransactionCard = ({
  amount,
  description,
  createdAt,
  category,
  isFixedExpense,
  onClick,
}) => {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <button
      onClick={onClick}
      className="
        w-full md:w-[80%]
        p-4 border rounded-lg
        hover:border-secondary hover:bg-base-200
        transition
        text-left
      "
    >
      {/* GRID HEADER (desktop) / STACK (mobile) */}
      <div
        className="
          grid grid-cols-1 md:grid-cols-4 gap-3 md:items-center
        "
      >
        {/* DESCRIPTION */}
        <div className="flex md:block justify-between">
          <span className="text-xs text-base-content/60 md:hidden">
            DESCRIPTION
          </span>
          <p className="text-sm">{capitalize(description)}</p>
        </div>

        {/* AMOUNT (more important visually) */}
        <div className="flex md:block justify-between">
          <span className="text-xs text-base-content/60 md:hidden">
            AMOUNT
          </span>
          <p className="text-lg font-semibold">${amount}</p>
        </div>

        {/* CATEGORY */}
        <div className="flex md:block justify-between">
          <span className="text-xs text-base-content/60 md:hidden">
            CATEGORY
          </span>
          <p className="text-sm">{capitalize(category)}</p>
        </div>

        {/* DATE */}
        <div className="flex md:block justify-between">
          <span className="text-xs text-base-content/60 md:hidden">
            DATE
          </span>
          <p className="text-sm">{formattedDate}</p>
        </div>
      </div>

      {/* FIXED EXPENSE BADGE */}
      {isFixedExpense && (
        <div className="mt-3">
          <span className="text-xs text-secondary italic">
            Fixed Expense
          </span>
        </div>
      )}
    </button>
  );
};

export default TransactionCard;