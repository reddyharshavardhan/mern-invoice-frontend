import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { AuthSlider } from "../components/AuthSlider";
import Header from "../components/Header";
import API from "../utils/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      dispatch(setUser(res.data));
      navigate("/products");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login error");
    }
  };

  return (
    <div className="min-h-screen bg-[#181b20] flex flex-col">
      <Header headerText="Connecting People With Technology" />
      <main className="flex flex-1 items-center justify-center bg-[#181b20]">
        <section className="flex w-[1150px] h-[540px] rounded-3xl shadow-2xl overflow-hidden bg-transparent gap-6">
          {/* Left: Image Slider */}
          <div className="w-1/2 bg-[#161922] rounded-3xl flex items-center justify-center">
            <AuthSlider />
          </div>

          {/* Right: Login Form */}
          <div className="w-1/2 flex flex-col justify-center px-10 py-9 bg-gradient-to-br from-[#23262b] via-[#20232b] to-[#17181c] rounded-3xl shadow-xl">
            <div className="flex justify-start mb-6">
              <img
                src="/logo.png"
                alt="Levitation Logo"
                className="h-10 w-auto object-contain"
                style={{ maxWidth: 160 }}
              />
            </div>

            <h1 className="text-2xl font-bold text-indigo-300 mb-2">
              Let the Journey Begin!
            </h1>

            

            <form onSubmit={onSubmit} className="space-y-5">
              {error && <div className="text-red-400 text-sm">{error}</div>}

              {/* Email input */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#22242a] text-cyan-200 rounded-lg border border-gray-700 px-4 py-2 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  style={{ boxSizing: "border-box" }}
                />
                <p className="text-xs text-cyan-100/80 mt-2 mb-6">
                  This email will be displayed with your inquiry
                </p>
              </div>

              {/* Password input */}
              <div>
                <label className="block text-sm font-semibold text-cyan-300 mb-2">
                  Current Password
                </label>
                <Input
                  type="password"
                  placeholder="Enter the Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#22242a] text-cyan-200 rounded-lg border border-gray-700 px-4 py-2 pr-6 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  style={{ boxSizing: "border-box" }}
                />
              </div>

              {/* Button and forgot password link */}
              <div className="flex items-center justify-between mt-10">
                <Button
                  type="submit"
                  className="bg-[#d0ff7d] hover:bg-[#c1e969] text-black font-bold px-5 py-2 text-sm rounded-xl"
                >
                  Login now
                </Button>
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-300 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Register link */}
              <div className="pt-4 text-center text-sm text-cyan-200">
                No account?{" "}
                <Link to="/register" className="underline text-green-300">
                  Register here
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}