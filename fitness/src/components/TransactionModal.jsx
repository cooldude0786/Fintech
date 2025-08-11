import React, { useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTransactionsContext } from "../context/TransactionsContext";

export default function TransactionModal() {
  const modalRef = useRef(null);
  const { auth } = useAuth();
  const { refetch } = useTransactionsContext();

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      title: form.title.value,
      amount: parseFloat(form.amount.value),
      type: form.type.value,
      description: form.description.value || "",
    };

    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        await refetch(); // Refresh immediately after adding
        form.reset();
        modalRef.current.close();
      } else {
        console.error("Failed to add transaction:", result.message);
        alert(result.message || "Error adding transaction");
      }
    } catch (err) {
      console.error("Error submitting transaction:", err);
      alert("Server error while adding transaction");
    }
  };

  return (
    <>
      <div className="flex justify-center my-4">
        <button className="btn btn-primary" onClick={openModal}>
          Add Transaction
        </button>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-full max-w-sm md:max-w-md lg:max-w-xl">
          <h3 className="font-bold text-lg mb-4">New Transaction</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                name="title"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Amount</span>
              </label>
              <input
                type="number"
                name="amount"
                required
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Type</span>
              </label>
              <select
                name="type"
                required
                defaultValue=""
                className="select select-bordered w-full"
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="income">Income (+)</option>
                <option value="expense">Expense (-)</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Description (optional)</span>
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-success">
                Save
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => modalRef.current.close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}
