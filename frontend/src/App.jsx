import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Stats from "./components/Stats.jsx";
import TransactionTimeline from "./components/Timeline.jsx";
import TransactionModal from "./components/TransactionModal.jsx";
import AuthPage from "./components/pages/AuthPage.jsx";
import OtpPage from "./components/pages/OtpPage.jsx";
import { AuthProvider } from "./hooks/useAuth.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx"; // ✅ NEW
import { TransactionsProvider } from "./context/TransactionsContext";
import TransactionHistory from "./components/TransactionHistory.jsx"; 
export default function App() {
  return (
    <AuthProvider>
      <TransactionsProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Stats />
                    <TransactionTimeline />
                    <TransactionModal />
                    <TransactionHistory />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/otp" element={<OtpPage />} />
          </Routes>
        </Router>
      </TransactionsProvider>
    </AuthProvider>
  );
}
