import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { useAuth } from '../hooks/useAuth.jsx'; // ✅ import useAuth

export default function Navbar() {
  const { auth, logout } = useAuth(); // ✅ get auth and logout from context

  return (
    <div className="navbar bg-base-300 shadow-sm px-4">
      {/* Brand Logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl normal-case">
          FinTech Audit
        </Link>
      </div>

      {/* Right-side: Either Auth buttons or Logout */}
      <div className="flex-none">
        {auth.token ? (
          // ✅ Show when logged in
          <div className="flex items-center gap-4">
            <span className="font-semibold">Hello, {auth.username}</span>
            <button onClick={logout} className="btn btn-error btn-sm">
              Logout
            </button>
          </div>
        ) : (
          // ✅ Show when not logged in
          <Link to="/auth" className="btn btn-ghost" title="Login / Signup">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4 4 0 018 16h8a4 4 0 012.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-primary">Login / Signup</span>
          </Link>
        )}
      </div>
    </div>
  );
}

