import ExpenseCard from "../components/cards/ExpenseCard";
import useFixedExpenseStore from "../store/fixed-expense/useFixedExpenseStore";
import { useEffect, useState } from "react";
import ModalWrapper from "../components/modals/ModalWrapper";
import ExpenseForm from "../components/forms/ExpenseForm";
import ActionConfirmation from "../components/forms/ActionConfirmation";

const FixedExpenses = () => {
  const {
    fixedExpenses,
    setFilter,
    currentFilter,
    getFixedExpenses,
    createFixedExpense,
    isLoadingFixedExpenses,
    editFixedExpense,
    deleteFixedExpense
  } = useFixedExpenseStore();

  const [activeModal, setActiveModal] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleExpenseOnClick = (expense) => {
    setSelectedExpense(expense);
    setActiveModal("editFixedExpense");
  };

  useEffect(() => {
    getFixedExpenses();
  }, [currentFilter]);

  return (
    <div className="flex flex-col items-center p-4 gap-8 h-dvh">
      <h2 className="text-center text-5xl px-4 text-primary indie-flower-regular">
        Fixed Expenses
      </h2>
      <div className="w-full flex flex-wrap-reverse gap-8 justify-center">
        {/* Category Filter */}

        <form className="filter" onReset={() => setFilter("all")}>
          {/* Reset → All */}
          <input
            className="btn btn-square"
            type="reset"
            value="×"
            title="All"
          />

          <input
            className="btn"
            type="radio"
            name="expense-filter"
            aria-label="Needs"
            checked={currentFilter === "needs"}
            onChange={() => setFilter("needs")}
          />

          <input
            className="btn"
            type="radio"
            name="expense-filter"
            aria-label="Wants"
            checked={currentFilter === "wants"}
            onChange={() => setFilter("wants")}
          />

          <input
            className="btn"
            type="radio"
            name="expense-filter"
            aria-label="Savings"
            checked={currentFilter === "savings"}
            onChange={() => setFilter("savings")}
          />
        </form>
        <button
          onClick={() => setActiveModal("createFixedExpense")}
          className="btn btn-primary btn-md"
        >
          + Create New Fixed Expense
        </button>
      </div>

      {/* Fixed Expenses */}
      <div className="w-full flex flex-col items-center gap-4">
        {!fixedExpenses && !isLoadingFixedExpenses ? (
          <p className="text-lg font-bold text-center">
            No fixed expenses found. <br />
            Click “Create New Fixed Expense” to add one 💸
          </p>
        ) : (
          fixedExpenses.map((expense) => (
            <ExpenseCard
              key={expense.id}
              amount={expense.amount}
              description={expense.description}
              createdAt={expense.created_at}
              category={expense.category}
              onClick={() => handleExpenseOnClick(expense)}
            />
          ))
        )}
      </div>
      {/* Modals */}
      {activeModal === "createFixedExpense" && (
        <ModalWrapper
          title={"Create Fixed Expense"}
          onClose={() => setActiveModal(null)}
        >
          <ExpenseForm
            onSubmit={(payload) => {
              setActiveModal(null);
              createFixedExpense(payload);
            }}
            infoText="Fixed expenses are recurring monthly payments that are automatically applied to each new budget."
            submitButtonText="Create Fixed Expense"
          />
        </ModalWrapper>
      )}
      {activeModal === "editFixedExpense" && (
        <ModalWrapper
          title="Edit Fixed Expense"
          onClose={() => {
            setActiveModal(null);
          }}
        >
          <ExpenseForm
            onSubmit={(payload) => {
              setActiveModal(null);
              editFixedExpense({ fixedExpenseId: Number(selectedExpense.id), ...payload });
            }}
            existingExpense={selectedExpense}
            submitButtonText="Save Changes"
            isDeleteButtonShown={true}
            deleteOnClick={()=>{
              setActiveModal("deleteConfirmation");
            }}
          />
        </ModalWrapper>
      )}
      {activeModal === "deleteConfirmation" && (
        <ModalWrapper
          title="Are you sure you want to delete this fixed expense?"
          onClose={() => {
            setActiveModal(null);
            setSelectedExpense(null);
          }}
        >
         <ActionConfirmation
          yesOnClick={() => {
            deleteFixedExpense({fixedExpenseId: Number(selectedExpense.id)});
            setActiveModal(null);
          }}
          noOnClick={() => {
            setActiveModal(null);
          }}
         />
        </ModalWrapper>
      )}
    </div>
  );
};

export default FixedExpenses;
