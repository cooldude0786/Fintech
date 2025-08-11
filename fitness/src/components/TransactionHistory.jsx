import React from "react";
import { useTransactionsContext } from "../context/TransactionsContext";

export default function TransactionHistory() {
  const { transactions, loading } = useTransactionsContext();

  if (loading) {
    return (
      <div className="text-center py-6 text-base-content/70">
        Loading transaction history...
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-6 text-base-content/70">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 rounded-xl border border-base-content/10 bg-base-100 shadow-lg">
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          {/* Table Head */}
          <thead className="bg-base-200">
            <tr>
              <th className="px-3 py-2 text-sm">#</th>
              <th className="px-3 py-2 text-sm">Title</th>
              <th className="px-3 py-2 text-sm">Type</th>
              <th className="px-3 py-2 text-sm">Amount</th>
              <th className="px-3 py-2 text-sm">Description</th>
              <th className="px-3 py-2 text-sm">Date</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {transactions.map((tx, index) => (
              <tr
                key={tx._id || index}
                className="hover:bg-base-200 transition-colors"
              >
                <td className="px-3 py-2 text-sm">{index + 1}</td>
                <td className="px-3 py-2 text-sm">{tx.title}</td>
                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      tx.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {tx.type}
                  </span>
                </td>
                <td
                  className={`px-3 py-2 text-sm font-medium ${
                    tx.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  ${tx.amount.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-sm text-base-content/80">
                  {tx.description || "-"}
                </td>
                <td className="px-3 py-2 text-sm text-base-content/70">
                  {new Date(tx.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
