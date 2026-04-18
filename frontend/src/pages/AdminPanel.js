import React, { useEffect, useState } from "react";

function AdminPanel() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [designs, setDesigns] = useState([]);

  const fetchDesigns = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/designs/public");
      const data = await res.json();
      setDesigns(data);
    } catch (err) {
      console.error("Failed to fetch designs");
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, []);

  // ✅ NOW condition AFTER hooks
  if (!user || user.role !== "ADMIN") {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Access Denied
      </h2>
    );
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/designs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setDesigns((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Delete failed");
    }
  };

  return (
    <main className="banner">
      <section className="content">
        <h1>Admin Panel</h1>
        <p>Manage all designs</p>

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

                <button
                  onClick={() => handleDelete(design.id)}
                  style={{
                    marginTop: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdminPanel;