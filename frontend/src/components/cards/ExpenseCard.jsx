const ExpenseCard = ({ amount, description, category, onClick }) => {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:items-center">
        {/* DESCRIPTION */}
        <div className="flex md:block justify-between">
          <span className="text-xs text-base-content/60 md:hidden">
            DESCRIPTION
          </span>
          <p className="text-sm">{capitalize(description)}</p>
        </div>

        {/* AMOUNT (slightly emphasized) */}
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
      </div>
    </button>
  );
};

export default ExpenseCard;