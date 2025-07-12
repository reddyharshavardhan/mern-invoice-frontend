import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage("Email sent! Please check your inbox.");
    } catch (error) {
      setMessage("Error sending email. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#181b20] text-white flex flex-col">
      <Header headerText="Back to Login" onHeaderButtonClick={() => navigate("/")} />
      <main className="flex flex-1 items-center justify-center bg-[#181b20]">
        <section className="flex w-[1150px] rounded-3xl shadow-2xl overflow-hidden bg-[#17181c] gap-10">
          <div className="w-1/2 flex flex-col justify-center px-16 py-12">
            <h1 className="text-3xl font-bold text-white mb-3">Reset Your Password</h1>
            <p>Enter your email to reset your password.</p>

            <form className="mt-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 mb-4 border border-gray-700 rounded bg-[#22242A] text-white"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 p-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </form>

            {message && <div className="text-white mt-4">{message}</div>}
          </div>

          <div className="w-1/2 flex items-center justify-center overflow-hidden">
            <img
              src="/img1.png"
              alt="Reset Password Illustration"
              className="rounded-3xl shadow-2xl object-cover w-full max-h-[540px]"
            />
          </div>
        </section>
      </main>
    </div>
  );
}