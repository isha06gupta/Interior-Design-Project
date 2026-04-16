import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDesigns, deleteDesign } from "../services/api";

function Home() {
  const navigate = useNavigate();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (!token) {
      setDesigns([]);
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      setDesigns([]);
      setLoading(false);
      return;
    }

    const fetchDesigns = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getAllDesigns(user.id);
        setDesigns(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load designs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this design?");
    if (!confirmed) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      await deleteDesign(id);
      setDesigns((prevDesigns) => prevDesigns.filter((design) => design.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete design.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="banner">
      <section className="content">
        <h1>Design your house!</h1>
        <p>
          Login to your account to show your previous work.
          <br />
          If no account then please register.
        </p>

        <div className="button-group">
          {!isLoggedIn && (
            <>
              <button type="button" onClick={() => navigate("/login")}>
                <span></span>
                Login
              </button>
              <button type="button" onClick={() => navigate("/register")}>
                <span></span>
                Register
              </button>
            </>
          )}
        </div>

        <section className="designs-section">
          <h2>Interior Designs</h2>

          {loading && <p className="status-text">Loading designs...</p>}

          {!loading && error && (
            <p className="status-text error-text">{error}</p>
          )}

          {!loading && !error && designs.length === 0 && (
            <p className="status-text">No designs available yet.</p>
          )}

          {!loading && !error && designs.length > 0 && (
            <div className="design-grid">
              {designs.map((design) => (
                <article className="design-card" key={design.id}>
                  <img
                    src={`http://localhost:8080/uploads/${design.imagePath}`}
                    alt={design.title || "Interior Design"}
                    className="design-image"
                  />
                  <div className="design-body">
                    <h3>{design.title}</h3>
                    <p>{design.description}</p>
                    <span className="design-tag">{design.category}</span>
                    {isLoggedIn && (
                      <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          onClick={() => navigate(`/edit-design/${design.id}`)}
                        >
                          <span></span>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(design.id)}
                          disabled={deletingId === design.id}
                        >
                          <span></span>
                          {deletingId === design.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}

export default Home;