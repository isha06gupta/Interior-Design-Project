import React, { useState, useRef } from "react";
import { createDesign } from "../services/api";

const categories = ["Bedroom", "Kitchen", "Living Room", "Front"];

function AddDesign() {
  const fileInputRef = useRef(null);   // ✅ correct place

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: categories[0],
    image: null
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      setError("Please login first.");
      setSubmitting(false);
      return;
    }

    if (!formData.image) {
      setError("Please select an image file.");
      setSubmitting(false);
      return;
    }

    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      payload.append("userId", user.id);
      payload.append("image", formData.image);

      await createDesign(payload);

      // ✅ success
      setMessage("Design added successfully.");

      // ✅ reset form
      setFormData({
        title: "",
        description: "",
        category: categories[0],
        image: null
      });

      // ✅ reset file input (important)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

    } catch (err) {
      if (typeof err.response?.data === "object") {
        const values = Object.values(err.response.data);
        setError(values[0] || "Failed to add design.");
      } else {
        setError(err.response?.data?.error || "Failed to add design.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2>Add Design</h2>
        <p>Create and publish a new interior design.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="design-title">Title</label>
          <input
            id="design-title"
            name="title"
            type="text"
            placeholder="Enter design title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="design-description">Description</label>
          <input
            id="design-description"
            name="description"
            type="text"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="design-category">Category</label>
          <select
            id="design-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <label htmlFor="design-image">Image</label>
          <input
            ref={fileInputRef}
            id="design-image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />

          <button type="submit" disabled={submitting}>
            <span></span>
            {submitting ? "Adding..." : "Add Design"}
          </button>
        </form>

        {message && <p className="form-message success-text">{message}</p>}
        {error && <p className="form-message error-text">{error}</p>}
      </section>
    </main>
  );
}

export default AddDesign;