import ScrollContainer from "../components/containers/ScrollContainer";

const FixedExpenses = () => {
  return (
    <div className="flex flex-col items-center p-4 gap-4 h-dvh w-full">
      <h2 className="text-4xl md:text-5xl px-4 text-primary indie-flower-regular">
        Fixed Expenses
      </h2>
        <ScrollContainer/>

    </div>
  );
};

export default FixedExpenses;
