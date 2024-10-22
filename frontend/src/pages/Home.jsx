import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MessageContainer from "../components/messages/MessageContainer";
import ProtectedRoute from "../components/ProtectedRoute";

const Home = () => {
  return (
    <ProtectedRoute>
      <div className="flex sm:h-[450px] md:h-[550px] overflow-hidden rounded-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </ProtectedRoute>
  );
};

export default Home;
