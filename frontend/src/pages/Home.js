import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllDesigns, deleteDesign } from "../services/api";
import decor from "../assets/decor.jpg";

function Home() {
  const navigate = useNavigate();

  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]); // ✅ NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (!token) {
      setDesigns([]);
      setFilteredDesigns([]);
      setLoading(false);
      return;
    }

    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      setDesigns([]);
      setFilteredDesigns([]);
      setLoading(false);
      return;
    }

    const fetchDesigns = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await getAllDesigns(user.id);
        const list = Array.isArray(data) ? data : [];

        setDesigns(list);
        setFilteredDesigns(list); // ✅ important
      } catch (err) {
        setError(err.response?.data?.error || "Failed to load designs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  // ✅ SEARCH LISTENER
  useEffect(() => {
    const handleSearch = (e) => {
      const value = e.detail.toLowerCase();

      const filtered = designs.filter((d) =>
        d.title?.toLowerCase().includes(value) ||
        d.description?.toLowerCase().includes(value) ||
        d.category?.toLowerCase().includes(value)
      );

      setFilteredDesigns(filtered);
    };

    window.addEventListener("search", handleSearch);
    return () => window.removeEventListener("search", handleSearch);
  }, [designs]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this design?");
    if (!confirmed) return;

    setDeletingId(id);

    try {
      await deleteDesign(id);
      setDesigns((prev) => prev.filter((d) => d.id !== id));
      setFilteredDesigns((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete design.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <main className="hero-container">
      <section
        className="content hero"
        style={{
          backgroundImage: `url(${decor})`
        }}
      >
        <h1>Design your dream home</h1>
        {!isLoggedIn && (
  <p className="hero-subtext">
    Login to view and manage your designs
  </p>
)}

{isLoggedIn && (
  <div className="button-group">
    <button onClick={() => navigate("/my-designs")}>
      <span></span>
      My Designs
    </button>
  </div>
)}

        {!isLoggedIn && (
          <div className="button-group">
            <button onClick={() => navigate("/login")}>
              <span></span>
              Login
            </button>
            <button onClick={() => navigate("/register")}> 
              <span></span>
              Register
            </button>
          </div>
        )}
      </section>

      <section className="section">
        <h2>What You Can Do</h2>

        <div className="info-grid">
          <div className="design-card">
            <div className="design-body">
              <h3>Add your own designs</h3>
              <p>Create new interior concepts and upload images to build your portfolio.</p>
            </div>
          </div>

          <div className="design-card">
            <div className="design-body">
              <h3>Edit or remove designs</h3>
              <p>Keep your collection fresh by modifying titles, descriptions, or removing old entries.</p>
            </div>
          </div>

          <div className="design-card">
            <div className="design-body">
              <h3>Explore room styles</h3>
              <p>Browse designs by room type and find inspiration for every space.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Browse by Room</h2>

        <div className="room-grid">
          {[
            { title: "Bedroom", image: "bedroom" },
            { title: "Kitchen", image: "kitchen" },
            { title: "Living Room", image: "living" },
            { title: "Front Design", image: "front" }
          ].map((room) => (
            <div
              key={room.title}
              className="room-card"
              onClick={() => navigate(`/${room.title.toLowerCase().replace(/ /g, "")}`)}
            >
              <img
                src={`/images/${room.image}.jpg`}
                className="room-image"
                alt={room.title}
              />
              <div className="room-title">{room.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Latest Designs</h2>

        <div className="room-grid">
          {["suggest", "bedroom", "kitchen", "living"].map((img) => (
            <div className="room-card" key={img}>
              <img
                src={`/images/${img}.jpg`}
                className="room-image"
                alt="design"
              />
              <div className="room-title"></div>
            </div>
          ))}
        </div>
      </section>

      <p className="tagline">
        Discover, create, and manage your interior design ideas in one place.
      </p>
    </main>
  );
}

export default Home;