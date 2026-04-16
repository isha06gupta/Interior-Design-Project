import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await loginUser(formData);
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: response.id, email: response.email })
      );
      navigate("/");
    } catch (err) {
      if (typeof err.response?.data === "object") {
        const values = Object.values(err.response.data);
        setError(values[0] || "Login failed.");
      } else {
        setError(err.response?.data?.error || "Login failed.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2>Login</h2>
        <p>Welcome back! Enter your details below.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={submitting}>
            <span></span>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="form-message error-text">{error}</p>}
      </section>
    </main>
  );
}

export default Login;