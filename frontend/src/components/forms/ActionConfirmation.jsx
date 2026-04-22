const ActionConfirmation = ({ yesOnClick, noOnClick }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-8">
      <div className="flex gap-8">
        <button onClick={yesOnClick} className="btn btn-primary">
          Yes
        </button>
        <button onClick={noOnClick} className="btn btn-secondary">
          No
        </button>
      </div>
    </div>
  );
};

export default ActionConfirmation;
