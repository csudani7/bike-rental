//#Global Imports
import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

//#Local Impoprts
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import PrivateRoute from "./hoc/PrivateRoute";
import CreateBike from "./pages/CreateBike";
import ManagerManage from "./pages/ManagerManage";
import BikeManage from "./pages/BikeManage";
import MyBike from "./pages/My Bike";
import { ApplicationProcessContext } from "./Context";

//CSS Import
import "./assets/global.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user } = useContext(ApplicationProcessContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      navigate("/home");
    }
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
          <Route path="/user-manage" element={<ManagerManage />} />
          <Route path="/bike-manage" element={<BikeManage />} />
          <Route path="/my-bike" element={<MyBike />} />
        </Route>
        <Route path="*" element={<p>Not Found</p>} />
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
