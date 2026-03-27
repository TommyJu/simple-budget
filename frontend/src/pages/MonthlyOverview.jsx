import useAuthStore from "../store/auth/useAuthStore";

const MonthlyOverview = () => {
  const { logout } = useAuthStore();

  return (
    <div>
      <p>MonthlyOverview page</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default MonthlyOverview;
