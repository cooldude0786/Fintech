import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function OtpPage() {
  const [otp, setOtp] = useState('');
  const userId = localStorage.getItem('pendingUserId');

  const handleVerify = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.removeItem('pendingUserId');
      window.location.href = '/';
    } else {
      alert(data.message || 'OTP failed');
    }
  };

  return (
    <div
      className="flex items-center justify-center bg-base-100 p-4"
      style={{ minHeight: 'calc(100vh - 4rem)' }} // Adjust if navbar height changes
    >
      <motion.div
        className="w-full max-w-sm bg-base-300 p-6 rounded-3xl shadow-xl border border-base-300"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <motion.h2
          className="text-2xl font-bold text-center mb-6 text-primary"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Enter OTP
        </motion.h2>

        <motion.form
          onSubmit={handleVerify}
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <motion.input
            type="text"
            className="input input-bordered w-full focus:scale-[1.02] transition-transform"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="btn btn-primary w-full rounded-full shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            Verify
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
