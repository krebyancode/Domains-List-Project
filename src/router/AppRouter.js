import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Main from "../pages/Main";
import Login from "../pages/Login";
import AddDomain from "../pages/AddDomain";
import ViewDomain from "../pages/ViewDomain";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add" element={<AddDomain />} />
        <Route path="/view" element={<ViewDomain />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
