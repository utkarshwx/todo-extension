import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import { TodoList } from "../components/TodoList";

const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    chrome.storage.local.get("token", (result) => {
      if (result.token) {
        setIsLoggedIn(true);
      }
    });
  }, []);

  const handleLogout = () => {
    chrome.storage.local.remove("token", () => {
      setIsLoggedIn(false);
    });
  };

  return (
    <div className="min-w-[250px] min-h-[300px] bg-white p-4">
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
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
};

export default Popup;
