import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ApplicationProcessContext } from "../Context";

const PrivateRoute = () => {
  const { user: currentUser } = useContext(ApplicationProcessContext);
  return currentUser ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default PrivateRoute;
