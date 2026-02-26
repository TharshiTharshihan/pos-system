"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/userSlice";

function Page() {
  const { currentUser, isLoggedIn } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        dispatch(logout());
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Dashboard Page</h1>
        {isLoggedIn && (
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-bold cursor-pointer hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        )}
      </div>
      {/* logout model */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-900">
          <div className="relative p-4 w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow ">
              {/* Close button (X) */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-gray-400 hover:bg-teal-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>

              {/* Content */}
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-red-600 w-12 h-12 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-medium text-gray-700 ">
                  Are you sure you want to sign out?
                </h3>

                {/* Yes button */}
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none 
                             focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg 
                             text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                >
                  Yes, Sign Out
                </button>

                {/* Cancel button */}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-5 text-sm font-medium text-gray-700 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-teal-100  hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-100  "
                >
                  No, Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <p>Current User: {currentUser?.name || "Normal User"}</p>
      <p>Status: {isLoggedIn ? "Logged In" : "Not Logged In"}</p>
    </div>
  );
}

export default Page;
