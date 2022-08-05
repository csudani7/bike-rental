//#Global Imports
import { useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

//#Local Impoprts
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";
import CreateBike from "./pages/add-bike";
import ManagerManage from "./pages/manage-role";
import BikeManage from "./pages/bike-manage";
import MyBike from "./pages/my-bike";
import NotFoundPage from "./pages/not-found";
import PrivateRoute from "./hoc/usePrivateRoute";
import { ApplicationProcessContext } from "./context";

//CSS Import
import "./assets/css/global.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(ApplicationProcessContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      <Routes>
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/createBike" element={<CreateBike />} />
          <Route
            path="/user-manage"
            element={
              user?.role === "Manager" ? (
                <ManagerManage />
              ) : (
                <Navigate to={"/home"} />
              )
            }
          />
          <Route
            path="/bike-manage"
            element={
              user?.role === "Manager" ? (
                <BikeManage />
              ) : (
                <Navigate to={"/home"} />
              )
            }
          />
          <Route path="/my-bike" element={<MyBike />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
