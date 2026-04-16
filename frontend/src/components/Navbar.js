import React from "react";
import { Link, useNavigate } from "react-router-dom";

const navItems = [
  "Home",
  "About Us",
  "Bedroom",
  "Dining",
  "Kitchen",
  "Backyard",
  "Contact"
];

function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo-link" aria-label="Go to home page">
        <img src="/logo.jpg" className="logo" alt="Interior Design Logo" />
      </Link>

      <ul>
        {navItems.map((item) => (
          <li key={item}>
            <Link to="/">{item}</Link>
          </li>
        ))}
      </ul>

      {isLoggedIn ? (
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Link to="/add-design" className="add-design-link">
            Add Design
          </Link>
          <button type="button" onClick={handleLogout} className="add-design-link">
            Logout
          </button>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;