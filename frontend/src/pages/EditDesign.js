import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllDesigns, updateDesign } from "../services/api";

function EditDesign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Bedroom",
    imagePath: "",
    userId: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadDesign = async () => {
      setLoading(true);
      setError("");

      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const designs = await getAllDesigns(user.id);
        const selectedDesign = designs.find((design) => String(design.id) === String(id));

        if (!selectedDesign) {
          setError("Design not found.");
          return;
        }

        setFormData({
          title: selectedDesign.title || "",
          description: selectedDesign.description || "",
          category: selectedDesign.category || "Bedroom",
          imagePath: selectedDesign.imagePath || "",
          userId: user.id
        });
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load design details.");
      } finally {
        setLoading(false);
      }
    };

    loadDesign();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await updateDesign(id, formData);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update design.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="auth-page">
        <section className="auth-card">
          <p className="status-text">Loading design details...</p>
        </section>
      </main>
    );
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h2>Edit Design</h2>
        <p>Update your interior design details.</p>

        {error && <p className="status-text error-text">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="edit-title">Title</label>
          <input
            id="edit-title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="edit-description">Description</label>
          <input
            id="edit-description"
            name="description"
            type="text"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <label htmlFor="edit-category">Category</label>
          <select
            id="edit-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Bedroom">Bedroom</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Dining">Dining</option>
            <option value="Backyard">Backyard</option>
          </select>

          <label htmlFor="edit-imagePath">Image File Name</label>
          <input
            id="edit-imagePath"
            name="imagePath"
            type="text"
            value={formData.imagePath}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={saving}>
            <span></span>
            {saving ? "Saving..." : "Update Design"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default EditDesign;