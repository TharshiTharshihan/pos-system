"use client";

import React from "react";
import { useAppSelector } from "../../redux/hooks";

function Page() {
  const { currentUser, isLoggedIn } = useAppSelector((state) => state.user);

  return (
    <div>
      <h1>Admin Dashboard Page</h1>
      <p>Current User: {currentUser?.name || "Admin"}</p>
      <p>Status: {isLoggedIn ? "Logged In" : "Not Logged In"}</p>
    </div>
  );
}

export default Page;
