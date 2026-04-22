import { useState } from "react";

const ExpenseForm = ({
  onSubmit,
  existingExpense,
  infoText = "",
  submitButtonText = "Submit",
  deleteOnClick,
  isDeleteButtonShown = false,
}) => {
  const [form, setForm] = useState({
    amount: existingExpense.amount || "",
    description: existingExpense.description || "",
    category: existingExpense.category || "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormComplete =
    form.amount !== "" &&
    form.description.trim() !== "" &&
    form.category !== "";
  const isAmountValid = Number(form.amount) >= 0;
  const isFormValid = isFormComplete && isAmountValid;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = {
      amount: Number(form.amount),
      description: form.description,
      category: form.category,
    };

    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <p className="text-sm">{infoText}</p>
      {/* Description */}
      <div>
        <label className="label">
          <span className="label-text">Description</span>
        </label>
        <input
          name="description"
          type="text"
          className="input input-bordered w-full validator"
          minLength="1"
          maxLength="30"
          required
          value={form.description}
          onChange={handleChange}
          title={"Please enter a description"}
        />
      </div>
      {/* Amount */}
      <div>
        <label className="label">
          <span className="label-text">Amount ($)</span>
        </label>
        <input
          name="amount"
          type="number"
          className="input input-bordered w-full validator"
          min="0"
          required
          value={form.amount}
          onChange={handleChange}
          title={"Please enter a positive number"}
        />
      </div>
      {/* Category */}
      <select
        name="category"
        className="select select-bordered w-1/2 validator"
        required
        value={form.category}
        onChange={handleChange}
      >
        <option value="">Category</option>
        <option value="needs">Needs</option>
        <option value="wants">Wants</option>
        <option value="savings">Savings</option>
      </select>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!isFormValid}
      >
        {submitButtonText}
      </button>
      {isDeleteButtonShown && (
        <div>
          <p className="text-error text-sm">Danger Zone</p>
          <div className="border p-4 rounded-lg border-error">
            <button
              onClick={deleteOnClick}
              type="button"
              className="btn btn-error btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default ExpenseForm;
