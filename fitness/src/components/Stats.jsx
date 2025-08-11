import React, { useMemo } from "react";
import { useTransactionsContext } from "../context/TransactionsContext";

export default function Stats() {
  const { transactions, loading } = useTransactionsContext();

  // Calculate totals from transactions
  const { income, expense, saving } = useMemo(() => {
    let inc = 0;
    let exp = 0;

    transactions.forEach((tx) => {
      if (tx.type === "income") {
        inc += tx.amount;
      } else if (tx.type === "expense") {
        exp += tx.amount;
      }
    });

    return {
      income: inc,
      expense: exp,
      saving: inc - exp,
    };
  }, [transactions]);

  const lastUpdateDate =
    transactions.length > 0
      ? new Date(transactions[0].createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        })
      : "—";

  if (loading) {
    return <div className="text-center py-6">Loading stats...</div>;
  }

  return (
    <div className="min-h-[40vh] grid grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center p-4">
      {/* Income */}
      <div className="stat shadow bg-base-300 rounded-box place-items-center w-full max-w-xs col-span-1">
        <div className="stat-title text-sm md:text-base">Income</div>
        <div className="stat-value text-success text-lg md:text-2xl lg:text-3xl">
          ${income.toLocaleString()}
        </div>
        <div className="stat-desc text-xs md:text-sm break-words whitespace-normal text-center">
          Updated on {lastUpdateDate}
        </div>
      </div>

      {/* Expense */}
      <div className="stat shadow bg-base-300 rounded-box place-items-center w-full max-w-xs col-span-1">
        <div className="stat-title text-sm md:text-base">Expense</div>
        <div className="stat-value text-error text-lg md:text-2xl lg:text-3xl">
          ${expense.toLocaleString()}
        </div>
        <div className="stat-desc text-xs md:text-sm break-words whitespace-normal text-center">
          Updated on {lastUpdateDate}
        </div>
      </div>

      {/* Saving */}
      <div className="stat shadow bg-base-300 rounded-box place-items-center w-full max-w-xs col-span-2 lg:col-span-1 mx-auto">
        <div className="stat-title text-sm md:text-base">Saving</div>
        <div className="stat-value text-info text-lg md:text-2xl lg:text-3xl">
          ${saving.toLocaleString()}
        </div>
        <div className="stat-desc text-xs md:text-sm break-words whitespace-normal text-center">
          Updated on {lastUpdateDate}
        </div>
      </div>
    </div>
  );
}
