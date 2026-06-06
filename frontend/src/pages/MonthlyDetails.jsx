import BudgetDetails from "../components/budget_details/BudgetDetails";
import useMonthStore from "../store/month/useMonthStore";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar/Navbar";
import { formatMonthYear } from "../lib/utils";
import useTransactionStore from "../store/transaction/useTransactionStore";
import TransactionCard from "../components/cards/TransactionCard";
import ExpenseForm from "../components/forms/ExpenseForm";
import ModalWrapper from "../components/modals/ModalWrapper";

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
    getTransactions,
    createTransaction,
    editTransaction,
    deleteTransaction,
  } = useTransactionStore();

  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    getMonthDetails();
  }, []);

  useEffect(() => {
    if (selectedMonthDetails) {
      getTransactions({ monthId: selectedMonthDetails.id });
      console.log(selectedMonthDetails);
    }
  }, [selectedMonthDetails]);

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
            submitButtonText="Save"
            isDeleteButtonShown={false}
          />
        </ModalWrapper>
      )}
    </div>
  );
};

export default MonthlyDetails;
