import BudgetDetails from "../components/budget_details/BudgetDetails";
import useMonthStore from "../store/month/useMonthStore";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import { formatMonthYear } from "../lib/utils";

const MonthlyDetails = () => {
  const { getMonthDetails, selectedMonthDetails, isMonthsLoading } =
    useMonthStore();
  const formattedDate = selectedMonthDetails
    ? formatMonthYear(selectedMonthDetails.year, selectedMonthDetails.month)
    : "";

  useEffect(() => {
    getMonthDetails();
  }, []);

  return (
    <div className="flex flex-col w-full p-4 gap-8">
      <NavBar isBackButtonShown={true} pageTitle={formattedDate} />
      {!selectedMonthDetails ? (
        <p>Loading</p>
      ) : (
        <div className="flex flex-col items-center gap-10">
          <BudgetDetails data={selectedMonthDetails} />
          <button className="btn btn-secondary w-[80%] max-w-md mx-4">Add Transaction</button>
          <h4 className="text-3xl font-bold">Transaction History</h4>
          
        </div>
      )}
    </div>
  );
};

export default MonthlyDetails;
