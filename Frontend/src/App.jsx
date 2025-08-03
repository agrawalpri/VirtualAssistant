import React from "react";
// import { createRoot } from "react-dom/client";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
// import { useContext } from "react";
// import { UserDataContext } from "./context/UserContext";

function App() {
  // const { userData, setUSerData } = useContext(UserDataContext);
  return (
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      {/* <Route path="/customize" element={<Customize />} /> */}
    </Routes>
  );
}

export default App;
