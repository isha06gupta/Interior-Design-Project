import React, { useEffect, useState } from "react";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    "All",
    "Bedroom",
    "Living Room",
    "Kitchen",
    "Front"
  ];

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          "http://localhost:8080/api/designs/public"
        );
        const data = await response.json();

        setDesigns(data);
        setFilteredDesigns(data);
      } catch (err) {
        setError("Failed to load designs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  // CATEGORY FILTER
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredDesigns(designs);
    } else {
      setFilteredDesigns(
        designs.filter((d) => d.category === selectedCategory)
      );
    }
  }, [selectedCategory, designs]);

  // SEARCH FILTER
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

  return (
    <main className="banner">
      <section className="content">
        <h1>Gallery</h1>

        {/* ✅ FILTER */}
        <div className="filter-container">
          <label>Filter by Category</label>

          <select
            className="filter-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* STATES */}
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {/* GRID */}
        <div className="design-grid">
          {filteredDesigns.map((design) => (
            <div className="design-card" key={design.id}>
              <img
  src={`http://localhost:8080/uploads/${design.imagePath}`}
  className="design-image"
  alt="design"
  onClick={() =>
    setSelectedImage(
      `http://localhost:8080/uploads/${design.imagePath}`
    )
  }
/>
              <div className="design-body">
                <h3>{design.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
      {selectedImage && (
  <div
    className="image-modal-overlay"
    onClick={() => setSelectedImage(null)}
  >
    <div
      className="image-modal-content"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={selectedImage} alt="full-view" />
    </div>
  </div>
)}
    </main>
  );
}

export default Gallery;