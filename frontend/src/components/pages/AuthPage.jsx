import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth'; // ✅ adjust the path as needed

export default function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const { login } = useAuth(); // ✅ use context to store auth globally

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isSignup ? 'signup' : 'login';
    const payload = isSignup
      ? { username: form.username, email: form.email, password: form.password }
      : { email: form.email, password: form.password };

    try {
      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.otp_required) {
          localStorage.setItem('pendingUserId', data.userId);
          window.location.href = '/otp';
        } else if (data.token) {
          // ✅ Use context login function
          login({ token: data.token, username: data.username });
          window.location.href = '/';
        }
      } else {
        alert(data.message || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center p-4" style={{ minHeight: 'calc(100vh - 4rem)' }}>
      <motion.div
        className="w-full max-w-md bg-base-300 shadow-2xl rounded-3xl p-8 border border-base-300"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-6 text-center text-primary"
          key={isSignup ? 'signup-title' : 'login-title'}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {isSignup && (
              <motion.input
                key="username"
                type="text"
                name="username"
                placeholder="Username"
                required
                className="input input-bordered w-full focus:scale-[1.02] transition-transform"
                value={form.username}
                onChange={handleChange}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="input input-bordered w-full focus:scale-[1.02] transition-transform"
            value={form.email}
            onChange={handleChange}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          />

          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="input input-bordered w-full focus:scale-[1.02] transition-transform"
            value={form.password}
            onChange={handleChange}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />

          <motion.button
            type="submit"
            className="btn btn-primary w-full rounded-full shadow-lg hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </motion.button>
        </form>

        <motion.p
          className="text-center mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          {isSignup ? 'Already have an account?' : 'New here?'}{' '}
          <span
            className="text-primary font-semibold cursor-pointer hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Login' : 'Sign Up'}
          </span>
        </motion.p>
      </motion.div>
    </div>
  );
}
