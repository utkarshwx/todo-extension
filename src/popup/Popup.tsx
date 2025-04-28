import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { TodoList } from "../components/TodoList";

const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("token", (result) => {
      if (result.token) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const handleLogout = () => {
    chrome.storage.local.remove(["token", "user"], () => {
      setIsLoggedIn(false);
    });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleSwitchToRegister = () => {
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
  };

  return (
    <div className="min-w-[300px] min-h-[400px] bg-white p-4">
      {isLoggedIn ? (
        <>
          <TodoList />
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-1 rounded mt-2"
          >
            Logout
          </button>
        </>
      ) : showRegister ? (
        <Register onRegisterSuccess={handleSwitchToLogin} onSwitchToLogin={handleSwitchToLogin} />
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={handleSwitchToRegister} />
      )}
    </div>
  );
};

export default Popup;
