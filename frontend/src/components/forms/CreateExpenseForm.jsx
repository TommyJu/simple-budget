import { useState } from "react";

const CreateExpenseForm = ({ onSubmit, existingExpense }) => {
  const [form, setForm] = useState({
    amount: existingExpense?.amount || "",
    description: existingExpense?.description || "",
    category: existingExpense?.category || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isFormComplete =
    form.amount !== "" && form.description !== "" && form.category !== "";
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
        <p className="text-sm">Fixed expenses are payments </p>
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
          title={"Please enter a positive number"}
        />
      </div>
      {/* Category */}
      <div>
        <label className="label">
          <span className="label-text">Category</span>
        </label>
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
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!isFormValid}
      >
        Create Fixed Expense
      </button>
    </form>
  );
};

export default CreateExpenseForm;
