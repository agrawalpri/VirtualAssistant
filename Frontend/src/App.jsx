import React from "react";
// import { createRoot } from "react-dom/client";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Customize from "./pages/customize";
import { useContext } from "react";
import { UserDataContext } from "./context/UserContext";
import Home from "./pages/home";
import Customize2 from "./pages/Customize2";

function App() {
  const { userData, setUSerData } = useContext(UserDataContext);
  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData.assistantName ? (
            <Home />
          ) : (
            <Navigate to={"/customize"} />
          )
        }
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/customize"
        element={userData ? <Customize /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/customize2"
        element={userData ? <Customize2 /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;
