//#Global Imports
import React from "react";

//#Local Impoprts
import Navbar from "../navbar";

function MainLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Navbar />
      {children}
    </div>
  );
}

export default MainLayout;
