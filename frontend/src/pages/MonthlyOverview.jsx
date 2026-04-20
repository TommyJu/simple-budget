import useMonthStore from "../store/month/useMonthStore";
import MonthOverviewCard from "../components/cards/MonthOverviewCard";
import { useEffect, useState } from "react";
import ModalWrapper from "../components/modals/ModalWrapper";

const MonthlyOverview = () => {
  const { monthOverviews, getMonthOverviews } = useMonthStore();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    getMonthOverviews();
  }, []);

  return (
    <div className="flex flex-col h-dvh">
      <div className="flex flex-col overflow-scroll p-4 gap-4 items-center justify-start py-4">
        <div className="flex flex-col justify-center text-center p-4 w-full gap-6 flex-wrap">
          <h2 className="text-4xl md:text-5xl px-4 text-primary indie-flower-regular">
            Monthly Budgets
          </h2>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              className="btn btn-sm md:btn-md btn-primary"
              onClick={() => setActiveModal("createMonth")}
            >
              + Create New Month
            </button>
            <button className="btn btn-sm md:btn-md btn-secondary">
              Manage Fixed Expenses
            </button>
          </div>
        </div>
        {monthOverviews.map((monthOverview) => (
          <MonthOverviewCard
            key={monthOverview.id}
            monthOverview={monthOverview}
          />
        ))}
      </div>

      {/* Modal */}
      {activeModal === "createMonth" && (
        <ModalWrapper onClose={() => setActiveModal(null)}>
          Hello
          </ModalWrapper>
      )}
    </div>
  );
};

export default MonthlyOverview;
