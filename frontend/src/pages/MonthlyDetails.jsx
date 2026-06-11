import BudgetDetails from "../components/budget_details/BudgetDetails";
import useMonthStore from "../store/month/useMonthStore";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import { formatMonthYear } from "../lib/utils";
import useTransactionStore from "../store/transaction/useTransactionStore";
import TransactionCard from "../components/cards/TransactionCard";
import ExpenseForm from "../components/forms/ExpenseForm";
import ModalWrapper from "../components/modals/ModalWrapper";
import ActionConfirmation from "../components/forms/ActionConfirmation";

const MonthlyDetails = () => {
  const {
    getMonthDetails,
    selectedMonthDetails,
    createMonth,
    editMonth,
    deleteMonth,
  } = useMonthStore();
  const formattedDate = selectedMonthDetails
    ? formatMonthYear(selectedMonthDetails.year, selectedMonthDetails.month)
    : "";
  const {
    transactions,
    currentFilter,
    setFilter,
    getTransactions,
    createTransaction,
    editTransaction,
    deleteTransaction,
  } = useTransactionStore();

  const [activeModal, setActiveModal] = useState(null);

  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleTransactionOnClick = (transaction) => {
    setSelectedTransaction(transaction);
    setActiveModal("editTransaction");
  };

  useEffect(() => {
    getMonthDetails();
  }, []);

  useEffect(() => {
    if (selectedMonthDetails) {
      getTransactions({ monthId: selectedMonthDetails.id });
    }
  }, [selectedMonthDetails, currentFilter]);

  return (
    <div className="flex flex-col w-full p-8 gap-8">
      <NavBar isBackButtonShown={true} pageTitle={formattedDate} />
      {/* Month details */}
      {!selectedMonthDetails || !transactions ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center gap-10">
          <BudgetDetails data={selectedMonthDetails} />
          <h4 className="text-3xl font-bold">Transaction History</h4>
          <button
            onClick={() => setActiveModal("createTransaction")}
            className="btn btn-secondary w-[80%] max-w-md mx-4"
          >
            Add Transaction
          </button>
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
        </div>
      )}
      {/* Transactions */}
      <div className="w-full flex flex-col items-center gap-4">
        {transactions.length < 1 ? (
          <p className="text-lg font-bold text-center">
            No transactions found. <br />
            Click “Add Transaction” to add one 💸
          </p>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              amount={transaction.amount}
              description={transaction.description}
              createdAt={transaction.created_at}
              category={transaction.category}
              isFixedExpense={transaction.is_fixed_expense}
              onClick={() => handleTransactionOnClick(transaction)}
            />
          ))
        )}
      </div>
      {/* Forms */}
      {activeModal === "createTransaction" && (
        <ModalWrapper
          title="Create Transaction"
          onClose={() => setActiveModal(null)}
        >
          <ExpenseForm
            monthId={selectedMonthDetails?.id}
            onSubmit={async (payload) => {
              await createTransaction(payload);
              await getMonthDetails();
              setActiveModal(null);
            }}
            infoText={
              <div>
                <p>
                  A transaction is an expense dedicated to your needs, wants, or
                  savings. By adding a transaction you can keep track of your
                  spending in each of these categories.
                </p>
                <a
                  className="underline text-secondary"
                  href="https://www.wealthsimple.com/en-ca/learn/50-30-20-rule"
                  target="_blank"
                >
                  Learn more.
                </a>
              </div>
            }
            submitButtonText="Create Transaction"
            isDeleteButtonShown={false}
          />
        </ModalWrapper>
      )}
      {activeModal === "editTransaction" && (
        <ModalWrapper
          title="Edit Transaction"
          onClose={() => setActiveModal(null)}
        >
          <ExpenseForm
            monthId={selectedMonthDetails?.id}
            onSubmit={async (payload) => {
              await editTransaction({
                transactionId: selectedTransaction.id,
                ...payload,
              });
              await getMonthDetails();
              setActiveModal(null);
            }}
            existingExpense={selectedTransaction}
            infoText={<p>Edit the details of an existing transaction.</p>}
            submitButtonText="Save Changes"
            isDeleteButtonShown={true}
            deleteOnClick={() => {
              setActiveModal("deleteConfirmation");
            }}
          />
        </ModalWrapper>
      )}
      {activeModal === "deleteConfirmation" && (
        <ModalWrapper
          title="Are you sure you want to delete this transaction?"
          onClose={() => {
            setActiveModal(null);
            setSelectedTranscation(null);
          }}
        >
          <ActionConfirmation
            yesOnClick={() => {
              deleteTransaction({
                transactionId: selectedTransaction.id,
              });
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

export default MonthlyDetails;
