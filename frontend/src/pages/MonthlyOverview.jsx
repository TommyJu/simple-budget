import useMonthStore from "../store/month/useMonthStore";
import MonthOverviewCard from "../components/cards/MonthOverviewCard";
import { useEffect, useState } from "react";
import ModalWrapper from "../components/modals/ModalWrapper";
import CreateMonthForm from "../components/forms/CreateMonthForm";
import { Loader } from "lucide-react";

const MonthlyOverview = () => {
  const { monthOverviews, getMonthOverviews, createMonth, isMonthsLoading } =
    useMonthStore();
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    getMonthOverviews();
  }, []);

  return (
    <div className="flex flex-col h-dvh">
      <div className="flex flex-col overflow-scroll p-4 gap-4 items-center justify-start py-4">
        <div className="flex flex-col justify-center text-center p-4 w-full gap-6 flex-wrap">
          <h2 className="text-5xl px-4 text-primary indie-flower-regular">
            Monthly Budgets
          </h2>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              className="btn btn-md btn-primary"
              onClick={() => setActiveModal("createMonth")}
            >
              + Create New Month
            </button>
            <a
              className="btn btn-md btn-secondary"
              href="/fixed-expenses"
            >
              Manage Fixed Expenses
            </a>
          </div>
        </div>
        {!monthOverviews && !isMonthsLoading ? (
          <p className="text-lg font-bold">
            Looks like there are no budgets yet. <br />
            Use the "+ Create New Month" button to get started! 💸
          </p>
        ) : (
          monthOverviews.map((monthOverview) => (
            <MonthOverviewCard
              key={monthOverview.id}
              monthOverview={monthOverview}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {activeModal === "createMonth" && (
        <ModalWrapper
          title={"Create Monthly Budget"}
          onClose={() => setActiveModal(null)}
        >
          <CreateMonthForm
            onSubmit={(payload) => {
              setActiveModal(null);
              createMonth(payload);
            }}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default MonthlyOverview;
