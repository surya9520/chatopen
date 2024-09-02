"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import InputField from "../input/page";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  // State to manage email and password inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize useRouter for navigation

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://chatwave-ysq7.onrender.com/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Save token to localStorage upon successful login
        localStorage.setItem("token", response.data.token);
        // Redirect to home page
        router.push("/home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  // Function to handle Google login success
  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      const res = await axios.post(
        "https://chatwave-ysq7.onrender.com/auth/google",
        {
          idToken: credential,
        }
      );

      if (res.status === 200) {
        // Save token to localStorage upon successful Google login
        localStorage.setItem("token", res.data.token);
        // Redirect to home page
        router.push("/home");
      } else {
        console.error("Google login failed");
      }
    } catch (error) {
      console.error("Error during Google login:", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email input field */}
          <InputField
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password input field */}
          <InputField
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Login button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        {/* Google login button */}
        <div className="mt-6 flex items-center justify-center">
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={(error) => console.error("Google login error", error)}
            />
          </GoogleOAuthProvider>
        </div>
        {/* Link to registration page */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 hover:text-indigo-700"
            >
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
