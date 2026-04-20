import { useState } from "react";

const CreateMonthForm = ({ onSubmit }) => {
  const [form, setForm] = useState({
    income: "",
    needs: "",
    wants: "",
    savings: "",
    year: "",
    month: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const needs = Number(form.needs) || 0;
  const wants = Number(form.wants) || 0;
  const savings = Number(form.savings) || 0;

  const total = needs + wants + savings;

  const incomeNum = Number(form.income) || 0;

  const needsAmount = ((incomeNum * needs) / 100).toFixed(2);
  const wantsAmount = ((incomeNum * wants) / 100).toFixed(2);
  const savingsAmount = ((incomeNum * savings) / 100).toFixed(2);

  const allAllocationsFilled =
    form.needs !== "" && form.wants !== "" && form.savings !== "";

  const isNonNegative = needs >= 0 && wants >= 0 && savings >= 0;

  const isValidAllocation =
    total === 100 && allAllocationsFilled && isNonNegative;

  const isFormComplete =
    form.income !== "" && form.year !== "" && form.month !== "";

  const isFormValid = isValidAllocation && isFormComplete;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const payload = {
      income: Number(form.income),
      needsPercentage: needs,
      wantsPercentage: wants,
      savingsPercentage: savings,
      year: Number(form.year),
      month: Number(form.month),
    };

    onSubmit?.(payload);
  };

  const isOver = total > 100;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      {/* Income */}
      <div>
        <label className="label">
          <span className="label-text">Estimated Monthly Income</span>
        </label>
        <input
          name="income"
          type="number"
          className="input input-bordered w-full validator"
          min="0"
          required
          value={form.income}
          onChange={handleChange}
        />
      </div>

      {/* Needs */}
      <div>
        <label className="label w-full">
            <span className="label-text">Needs (%)</span>
            <span className="label-text ml-auto">
              ${needsAmount}
            </span>
        </label>
        <input
          name="needs"
          type="number"
          className={`input input-bordered w-full validator`}
          min="0"
          max="100"
          required
          value={form.needs}
          onChange={handleChange}
        />
      </div>

      {/* Wants */}
      <div>
        <label className="label w-full">
            <span className="label-text">Wants (%)</span>
            <span className="label-text ml-auto">
              ${wantsAmount}
            </span>
        </label>
        <input
          name="wants"
          type="number"
          className={`input input-bordered w-full validator`}
          min="0"
          max="100"
          required
          value={form.wants}
          onChange={handleChange}
        />
      </div>

      {/* Savings */}
      <div>
        <label className="label w-full">
            <span className="label-text">Savings (%)</span>
            <span className="label-text ml-auto">
              ${savingsAmount}
            </span>
        </label>
        <input
          name="savings"
          type="number"
          className={`input input-bordered w-full validator`}
          min="0"
          max="100"
          required
          value={form.savings}
          onChange={handleChange}
        />
      </div>

      {/* Allocation feedback */}
      <p
        className={`text-sm ${
          isValidAllocation
            ? "text-success"
            : isOver
              ? "text-error"
              : "text-warning"
        }`}
      >
        Total Allocation: {total}% (must equal 100%)
      </p>

      {/* Year + Month */}
      <div>
        <label className="label">
          <span className="label-text">Select Date</span>
        </label>

        <div className="flex gap-2">
          <input
            type="number"
            name="year"
            placeholder="Year"
            className="input input-bordered w-1/2 validator"
            min="2000"
            max="9999"
            required
            value={form.year}
            onChange={handleChange}
          />

          <select
            name="month"
            className="select select-bordered w-1/2 validator"
            required
            value={form.month}
            onChange={handleChange}
          >
            <option value="">Month</option>
            <option value="1">Jan</option>
            <option value="2">Feb</option>
            <option value="3">Mar</option>
            <option value="4">Apr</option>
            <option value="5">May</option>
            <option value="6">Jun</option>
            <option value="7">Jul</option>
            <option value="8">Aug</option>
            <option value="9">Sep</option>
            <option value="10">Oct</option>
            <option value="11">Nov</option>
            <option value="12">Dec</option>
          </select>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={!isFormValid}
      >
        Create Month
      </button>
    </form>
  );
};

export default CreateMonthForm;
