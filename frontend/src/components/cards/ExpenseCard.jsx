const ExpenseCard = ({amount, description, createdAt, category}) => {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  return (
    <div className="flex flex-wrap gap-2 p-4 border rounded-lg justify-evenly">
      <div>
        <label className="label">
          <span className="label-text">AMOUNT</span>
        </label>
        <p>${amount}</p>
      </div>
      <div>
        <label className="label">
          <span className="label-text">DESCRIPTION</span>
        </label>
        <p>{capitalize(description)}</p>
      </div>
      <div>
        <label className="label">
          <span className="label-text">CATEGORY</span>
        </label>
        <p>{capitalize(category)}</p>
      </div>
      <div>
        <label className="label">
          <span className="label-text">DATE</span>
        </label>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
