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
      <p>Monthly Overview page</p>
      <button onClick={logout}>Logout</button>
      {monthOverviews.map(monthOverview => (
        <MonthOverviewCard monthOverview={monthOverview}/>
      ))}
    </div>
  );
};

export default MonthlyOverview;
