import { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./hoc/PrivateRoute";
import CreateBike from "./pages/CreateBike";
import { ApplicationProcessContext } from "./Context";

import "./assets/global.css";
function App() {
  const { user } = useContext(ApplicationProcessContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      navigate("/createBike");
    }
  }, [user]);

  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/createBike" element={<CreateBike />} />
        </Route>
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
}

export default App;
