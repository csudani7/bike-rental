//#Global Imports
import React from "react";

//#Local Impoprts
import Navbar from "./Navbar";

export default function ProtectedLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Navbar />
      {children}
    </div>
  );
}
