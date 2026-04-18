import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Gallery", path: "/gallery" },
  { name: "Bedroom", path: "/bedroom" },
  { name: "Living Room", path: "/living" },
  { name: "Kitchen", path: "/kitchen" },
  { name: "Front Design", path: "/front" },
  { name: "Contact", path: "/contact" },
  { name: "Add Design", path: "/add-design" }
];

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="navbar">

      {/* LOGO */}
      <Link to="/" className="logo-link">
        <img src={logo} className="logo" alt="logo" />
      </Link>

      {/* NAV ITEMS */}
      <ul>
        {navItems.map((item) => (
          <li key={item.name}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
        {user?.role === "ADMIN" && (
          <li>
            <Link to="/admin">Admin Panel</Link>
          </li>
        )}
      </ul>

      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search designs..."
        className="search-input"
        onChange={(e) => {
          const value = e.target.value;
          window.dispatchEvent(new CustomEvent("search", { detail: value }));
        }}
        style={{
          padding: "10px 18px",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.8)",
          width: "240px",
          outline: "none",
          background: "rgba(255,255,255,0.95)",
          color: "#1b5e20",
          fontSize: "16px"
        }}
      />

      {/* RIGHT SIDE */}
      {isLoggedIn ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ fontWeight: "500", fontSize: "16px" }}>
            Hi, {user?.name?.trim() ? user.name : user?.email || "User"}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="add-design-link"
          >
            Logout
          </button>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      )}
    </header>
  );
}

export default Navbar;