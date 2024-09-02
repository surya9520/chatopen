"use client";

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  // State to manage chat messages, input value, and authentication status
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Effect to check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure this is correct
          },
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages(prevMessages => [...prevMessages, { user: 'You', text: input }]);
      setInput('');
      simulateResponse();
    }
  };

  // Simulate a response from support
  const simulateResponse = useCallback(() => {
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        { user: 'Support', text: 'How can I help you?' }
      ]);
    }, 1000);
  }, []);

  // Function to handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token'); // Remove token from localStorage
        router.push('/login');
      } else {
        console.error('Logout failed:', response.statusText);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  // Show loading message if not authenticated
  if (!isAuthenticated) return <p>Loading...</p>;

  return (
    <>
      {/* Navigation bar with application name and logout button */}
      <nav className="bg-indigo-600 p-4 flex justify-between items-center">
        <div className="text-white font-bold text-xl">ChatWave</div>
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
        >
          Logout
        </button>
      </nav>

      {/* Main chat interface */}
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Chat with Us</h1>
          <div className="chat-box border rounded-lg h-96 p-4 overflow-y-scroll bg-gray-50 mb-4">
            {/* Display chat messages */}
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 flex ${message.user === 'You' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-2 rounded-md ${
                    message.user === 'You'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-300 text-gray-800'
                  }`}
                >
                  <strong>{message.user}:</strong> <span>{message.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border border-gray-300 rounded-md resize-y min-h-[50px] max-h-[150px]"
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
