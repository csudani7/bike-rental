//Global Imports
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//Local Impoprts
import MainLayout from "../layouts/MainLayout";
import { UserConfigContext } from "../context";

const PrivateRoute = () => {
  const { user: currentUser } = React.useContext(UserConfigContext);

  return currentUser ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/auth/sign-in" />
  );
};

export default PrivateRoute;
