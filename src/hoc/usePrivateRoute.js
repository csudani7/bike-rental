//Global Imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//Local Impoprts
import ProtectedLayout from "../layouts";
import { ApplicationProcessContext } from "../context";

const PrivateRoute = () => {
  const { user: currentUser } = React.useContext(ApplicationProcessContext);

  return currentUser ? (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  ) : (
    <Navigate to="/auth/sign-in" />
  );
};

export default PrivateRoute;
