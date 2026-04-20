import useAuthStore from "../store/auth/useAuthStore";
import useMonthStore from "../store/month/useMonthStore";
import MonthOverviewCard from "../components/cards/MonthOverviewCard";
import { useEffect } from "react";

const MonthlyOverview = () => {
  const { logout } = useAuthStore();
  const { monthOverviews, getMonthOverviews } = useMonthStore();

  useEffect(() => {
    getMonthOverviews();
  }, []);

  return (
    <div>
      <h2>Monthly Budgets</h2>
      {monthOverviews.map(monthOverview => (
        <MonthOverviewCard monthOverview={monthOverview}/>
      ))}

      <h2>Recurring Monthly Transactions</h2>
    </div>
  );
};

export default MonthlyOverview;
