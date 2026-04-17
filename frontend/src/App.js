import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddDesign from "./pages/AddDesign";
import EditDesign from "./pages/EditDesign";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import MyDesigns from "./pages/MyDesigns";

import Bedroom from "./pages/Bedroom";
import Living from "./pages/Living";
import Kitchen from "./pages/Kitchen";
import Front from "./pages/Front";


function App() {
  return (
    <div className="app-shell">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />

        {/* 👇 ADD THESE ROUTES */}
        <Route path="/bedroom" element={<Bedroom />} />
        <Route path="/living" element={<Living />} />
        <Route path="/kitchen" element={<Kitchen />} />
        <Route path="/front" element={<Front />} />
        <Route path="/contact" element={<Contact />} />

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
  path="/my-designs"
  element={
    <ProtectedRoute>
      <MyDesigns />
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