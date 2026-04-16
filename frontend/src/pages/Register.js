import React, { useState } from "react";
import { registerUser } from "../services/api";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      await registerUser(formData);
      setMessage("Registration successful. You can now login.");
      setFormData({ name: "", email: "", password: "" });
    } catch (err) {
      if (typeof err.response?.data === "object") {
        const values = Object.values(err.response.data);
        setError(values[0] || "Registration failed.");
      } else {
        setError(err.response?.data?.error || "Registration failed.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2>Register</h2>
        <p>Create your account to save and manage your designs.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="register-name">Full Name</label>
          <input
            id="register-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />

          <button type="submit" disabled={submitting}>
            <span></span>
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>

        {message && <p className="form-message success-text">{message}</p>}
        {error && <p className="form-message error-text">{error}</p>}
      </section>
    </main>
  );
}

export default Register;