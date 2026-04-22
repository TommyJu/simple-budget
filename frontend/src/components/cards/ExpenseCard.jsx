const ExpenseCard = ({ amount, description, category, onClick }) => {

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <button onClick={onClick} className="hover:border-secondary flex flex-wrap gap-8 p-4 border rounded-lg w-full md:w-[80%]">
      <div className="flex flex-1 flex-col items-start">
        <label className="label">
          <span className="label-text">DESCRIPTION</span>
        </label>
        <p className="text-sm text-nowrap">{capitalize(description)}</p>
      </div>
      <div className="flex flex-1 flex-col items-start">
        <label className="label">
          <span className="label-text">AMOUNT</span>
        </label>
        <p className="text-sm">${amount}</p>
      </div>
      <div className="flex flex-1 flex-col items-start">
        <label className="label">
          <span className="label-text">CATEGORY</span>
        </label>
        <p className="text-sm">{capitalize(category)}</p>
      </div>
    </button>
  );
};

export default ExpenseCard;
