import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import API from "../utils/api";
import Header from "../components/Header";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Invalid Email.");
      return;
    }
    try {
      await API.post("/auth/register", { name, email, password });
      setSuccess("Registered! Redirecting...");
      setError("");
      setTimeout(() => navigate("/"), 1200);
    } catch (err: any) {
      setSuccess("");
      setError(err?.response?.data?.message || "Registration error");
    }
  };

  return (
    <div className="min-h-screen bg-[#191f25] flex flex-col">
      <Header headerText="Sign In" onHeaderButtonClick={() => navigate("/")} />
      <main className="flex flex-1 items-center justify-center bg-[#191f25]">
        <section className="flex w-[1150px] rounded-3xl shadow-2xl overflow-hidden bg-[#17181c] gap-10">
          {/* Left: Registration Form */}
          <div className="w-1/2 flex flex-col justify-center px-16 py-12">
            <h1 className="text-3xl font-bold text-white mb-3">Sign up to begin journey</h1>
            
            <form onSubmit={onSubmit} className="space-y-7 max-w-md">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              {success && <div className="text-green-400">{success}</div>}

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Enter your name
                </label>
                <Input
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 w-full px-4 border border-gray-600 rounded-md bg-[#22242A] text-white placeholder-gray-500 focus:border-[#d0ff7d] focus:ring-2 focus:ring-[#d0ff7d]"
                />
                <p className="mt-1 text-xs text-gray-500">
                  This name will be displayed with your inquiry
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="h-12 w-full px-4 border border-gray-600 rounded-md bg-[#22242A] text-white placeholder-gray-500 focus:border-[#d0ff7d] focus:ring-2 focus:ring-[#d0ff7d]"
                />
                <p className="mt-1 text-xs text-gray-500">
                  This email will be displayed with your inquiry
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Password
                </label>
                <Input
                  placeholder="Enter the Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="h-12 w-full px-4 border border-gray-600 rounded-md bg-[#22242A] text-white placeholder-gray-500 focus:border-[#d0ff7d] focus:ring-2 focus:ring-[#d0ff7d]"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Any further updates will be forwarded on this Email ID
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#d0ff7d] hover:bg-[#c1e969] text-black font-bold py-3 rounded-lg"
              >
                Register
              </Button>

              <div className="text-center text-gray-400 text-xs">
                <Link to="/" className="underline text-green-400">
                  Already have account?
                </Link>
              </div>
            </form>
          </div>

          {/* Right: Image */}
          <div className="w-1/2 flex items-center justify-center overflow-hidden">
            <img
              src="/img1.png"
              alt="Connecting People With Technology"
              className="rounded-3xl shadow-2xl object-cover w-full max-h-[540px]"
            />
          </div>
        </section>
      </main>
    </div>
  );
}