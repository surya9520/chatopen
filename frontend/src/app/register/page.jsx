"use client";

import React, { useState } from "react";
import InputField from "../input/page"; // Ensure this path is correct
import axios from "axios";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useRouter } from "next/navigation"; // Correct import for useRouter in Next.js 13

const Register = () => {
  // State variables to manage form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Hook to handle navigation

  // Function to handle Google sign-up
  const handleGoogleSignUp = async (response) => {
    try {
      const { credential } = response;
      const googleResponse = await axios.post(
        "https://chatwave-git-master-suryajoshi9520gmailcoms-projects.vercel.app/auth/google",
        {
          idToken: credential,
        }
      );

      if (googleResponse.status === 200) {
        // Save token to localStorage upon successful registration
        localStorage.setItem("token", googleResponse.data.token);
        alert("Registered successfully"); // Show success message
        router.push("/login"); // Redirect to login page
      } else {
        console.error("Google sign-up failed");
      }
    } catch (error) {
      console.error("Error during Google sign-up:", error);
      alert("Google sign-up failed. Please try again."); // Show error message
    }
  };

  // Function to handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://chatwave-git-master-suryajoshi9520gmailcoms-projects.vercel.app/auth/register",
        {
          name,
          email,
          password,
        }
      );
      console.log("Registration successful:", response.data);
      alert("Registration successful!"); // Show success message
      router.push("/login"); // Redirect to login page
    } catch (error) {
      console.error(
        "Error registering:",
        error.response ? error.response.data : error.message
      );
      alert("Registration failed. Please try again."); // Show error message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Input field for name */}
          <InputField
            id="name"
            type="text"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {/* Input field for email */}
          <InputField
            id="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Input field for password */}
          <InputField
            id="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* Register button */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
          </button>
        </form>
        <div className="mt-6 flex items-center justify-center">
          {/* Google OAuth provider for Google sign-up */}
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
          >
            <GoogleLogin
              onSuccess={handleGoogleSignUp} // Handle Google sign-up success
              onError={(error) => console.error("Google login error", error)} // Handle Google login errors
            />
          </GoogleOAuthProvider>
        </div>
        <div className="mt-6 text-center">
          {/* Link to login page for existing users */}
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
