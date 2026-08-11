import React from "react";
import Login from "../auth/Login";

const Home = () => {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1 className="text-3xl font-bold">Smart Attendance App</h1>

      <div className="mt-5 w-full max-w-md">
        <Login />
      </div>
    </div>
  );
};

export default Home;
