const ExpenseCard = ({amount, description, createdAt, category}) => {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <button className="hover:border-secondary flex flex-wrap gap-4 p-4 border rounded-lg justify-evenly w-full md:w-[80%]">
      <div className="flex flex-col items-start">
        <label className="label">
          <span className="label-text">AMOUNT</span>
        </label>
        <p className="text-sm">${amount}</p>
      </div>
      <div className="flex flex-col items-start">
        <label className="label">
          <span className="label-text">DESCRIPTION</span>
        </label>
        <p className="text-sm">{capitalize(description)}</p>
      </div>
      <div className="flex flex-col items-start">
        <label className="label">
          <span className="label-text">CATEGORY</span>
        </label>
        <p className="text-sm">{capitalize(category)}</p>
      </div>
      <div className="flex flex-col items-start">
        <label className="label">
          <span className="label-text">DATE</span>
        </label>
        <p className="text-sm">{formattedDate}</p>
      </div>
    </button>
  );
};

export default ExpenseCard;
