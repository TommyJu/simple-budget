const MonthOverviewCard = ({monthOverview}) => {
  if (!monthOverview) return null;

  const {
    year,
    month: monthNumber,
    income,
    total_spent,
    needs_spent,
    wants_spent,
    savings_spent,
  } = monthOverview;

  const monthName = new Date(year, monthNumber - 1).toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="border rounded-lg p-4 shadow-md bg-base-200 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {monthName} {year}
      </h2>

      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">Estimated Income:</span> ${income}
        </p>

        <p>
          <span className="font-medium">Total Spent:</span> ${total_spent}
        </p>

        <hr className="my-2" />

        <p>
          <span className="font-medium">Needs:</span> ${needs_spent}
        </p>

        <p>
          <span className="font-medium">Wants:</span> ${wants_spent}
        </p>

        <p>
          <span className="font-medium">Savings:</span> ${savings_spent}
        </p>
      </div>
    </div>
  );
};

export default MonthOverviewCard;