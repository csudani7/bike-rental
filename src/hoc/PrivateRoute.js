//Global Imports
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

//Local Impoprts
import { ApplicationProcessContext } from "../Context";
import ProtectedLayout from "../Layout";

const PrivateRoute = () => {
  const { user: currentUser } = useContext(ApplicationProcessContext);
  return currentUser ? (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  ) : (
    <Navigate to="/auth/sign-in" />
  );
};

export default PrivateRoute;
