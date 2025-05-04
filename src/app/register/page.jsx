"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import axios from "../utils/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!form.username || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/register", form);

      setMessage("✅ Register success! You can now login.");
      setLoading(false);
      setForm({ username: "", password: "" });
    } catch (error) {
      setError(`❌ ${error.response?.data?.message || error.message}`);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white/10 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-bold mb-6 text-center text-white">
            Register
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="flex items-center border-b border-white/70 text-white py-2">
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Username"
                className="bg-transparent outline-none text-white placeholder-white/70 flex-1"
              />
            </label>

            <label className="flex items-center border-b border-white/70 text-white py-2">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="bg-transparent outline-none text-white placeholder-white/70 flex-1"
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            {error && (
              <p className="mt-2 text-sm text-red-500 text-center">{error}</p>
            )}
            {message && (
              <p className="mt-2 text-sm text-green-500 text-center">
                {message}
              </p>
            )}
          </form>
          <hr className="my-4" />
          <p className="text-center text-white">
            already have an account? go to{" "}
            <Link className="text-blue-400 hover:underline" href="/login">
              login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
