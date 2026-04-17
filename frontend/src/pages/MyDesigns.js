import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDesigns, deleteDesign } from "../services/api";

function MyDesigns() {
  const navigate = useNavigate();

  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      const storedUser = localStorage.getItem("user");
      const user = storedUser ? JSON.parse(storedUser) : null;

      if (!user) {
        setError("Please login first.");
        setLoading(false);
        return;
      }

      try {
        const data = await getAllDesigns(user.id);
        setDesigns(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load designs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this design?");
    if (!confirm) return;

    setDeletingId(id);

    try {
      await deleteDesign(id);
      setDesigns((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError("Failed to delete design.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="banner" style={{ marginTop: "100px" }}>
      <section className="content">
        <h1>My Designs</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && designs.length === 0 && (
          <p>No designs found.</p>
        )}

        <div className="design-grid">
          {designs.map((design) => (
            <div className="design-card" key={design.id}>
              <img
                src={`http://localhost:8080/uploads/${design.imagePath}`}
                className="design-image"
                alt="design"
              />

              <div className="design-body">
                <h3>{design.title}</h3>
                <p>{design.description}</p>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button onClick={() => navigate(`/edit-design/${design.id}`)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(design.id)}
                    disabled={deletingId === design.id}
                  >
                    {deletingId === design.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default MyDesigns;