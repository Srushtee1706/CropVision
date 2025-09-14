"use client";
import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData);
    // Later connect with backend
  };

  return (
    <div className="flex h-screen">
      {/* Left: Login Form */}
      <div className="w-1/2 bg-black flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-3/4 max-w-md text-white space-y-6"
        >
          <h2 className="text-4xl font-bold">Login</h2>
          <p className="text-gray-400 text-sm">
            Sign in here if you already have an account.
          </p>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2">EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-green-600 focus:outline-none focus:border-green-400 text-white py-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent border-b border-green-600 focus:outline-none focus:border-green-400 text-white py-2"
            />
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-green-500" />
              Remember me
            </label>
            <a href="#" className="text-green-400 hover:underline">
              Forgot your password?
            </a>
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-full transition"
          >
            LOGIN
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <hr className="flex-1 border-gray-600" />
            <span className="text-gray-400 text-sm">OR</span>
            <hr className="flex-1 border-gray-600" />
          </div>

          {/* Social login */}
          <div className="flex justify-center gap-6 text-green-400 text-xl">
            <a href="#">F</a>
            <a href="#">G+</a>
            <a href="#">T</a>
          </div>
        </form>
      </div>

      {/* Right: Background Image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('/fern.jpg')" }}
      ></div>
    </div>
  );
}
