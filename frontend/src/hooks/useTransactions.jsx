import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export default function useTransactions() {
  const { auth } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    if (!auth?.token) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const data = await res.json();

      if (res.ok) {
        setTransactions(data);
      } else {
        console.error("Failed to fetch transactions:", data.message);
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [auth.token]);

  return { transactions, loading, refetch: fetchTransactions };
}
