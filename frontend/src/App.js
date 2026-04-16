import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddDesign from "./pages/AddDesign";
import EditDesign from "./pages/EditDesign";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-design"
          element={
            <ProtectedRoute>
              <AddDesign />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-design/:id"
          element={
            <ProtectedRoute>
              <EditDesign />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;