import useAuthStore from "../store/auth/useAuthStore";
import useMonthStore from "../store/month/useMonthStore";
import { useEffect } from "react";

const MonthlyOverview = () => {
  const { logout } = useAuthStore();
  const { months, getMonths } = useMonthStore();

  useEffect(() => {
    getMonths();
  }, []);

  return (
    <div>
      <p>MonthlyOverview page</p>
      <button onClick={logout}>Logout</button>
      {months.map(month => (
        <p key={month.id} className="text-white">
          {month.id}
        </p>
      ))}
    </div>
  );
};

export default MonthlyOverview;
