import React, { useEffect, useState } from "react";
import { useTransactionsContext } from "../context/TransactionsContext";

export default function TransactionTimeline() {
  const { transactions, loading } = useTransactionsContext();
  const [visibleTransactions, setVisibleTransactions] = useState([]);

  useEffect(() => {
    if (!transactions.length) return;

    const handleResize = () => {
      const isMobile = window.innerWidth < 1024;
      const count = isMobile ? 4 : 7;

      const mapped = transactions.map((tx) => ({
        date: new Date(tx.createdAt).toISOString().split("T")[0],
        label: tx.title,
        amount: tx.type === "income" ? tx.amount : -tx.amount,
      }));

      const sorted = mapped.sort((a, b) => new Date(b.date) - new Date(a.date));
      setVisibleTransactions(sorted.slice(0, count));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [transactions]);

  const totalSavings = visibleTransactions.reduce((acc, tx) => acc + tx.amount, 0);

  if (loading) return <div>Loading transactions...</div>;
  if (!transactions.length) return <div>No transactions found.</div>;

  return (
    <div className="overflow-x-auto lg:overflow-visible lg:flex lg:justify-center">
      <ul className="timeline timeline-vertical lg:timeline-horizontal">
        {visibleTransactions.map((tx, index) => (
          <li key={index}>
            {index !== 0 && <hr />}
            <div className="timeline-start text-sm">{tx.date}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={tx.amount >= 0 ? "green" : "red"}
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box text-sm text-center">
              <p className="font-semibold break-words">{tx.label}</p>
              <p className={tx.amount >= 0 ? "text-green-500" : "text-red-500"}>
                {tx.amount >= 0 ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}
              </p>
            </div>
          </li>
        ))}

        <li>
          <hr />
          <div className="timeline-start text-sm font-bold">Total</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="blue"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-sm font-semibold text-blue-500 text-center">
            Saving: ${totalSavings}
          </div>
        </li>
      </ul>
    </div>
  );
}
