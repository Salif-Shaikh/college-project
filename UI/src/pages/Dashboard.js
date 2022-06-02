import React, { useState } from "react";

import Sidebar from "../partials/Sidebar";

// import Banner from "../partials/Banner";
import MainContainer from "./MainContainer";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <MainContainer className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden" />
      {/*  Site header */}
      {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
      {/* Content Container */}
      {/* <MainContainer /> */}
    </div>
  );
}

export default Dashboard;
