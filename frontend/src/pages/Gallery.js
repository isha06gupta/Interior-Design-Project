import React, { useEffect, useState } from "react";

function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});

  const categories = [
    "All",
    "Bedroom",
    "Living Room",
    "Kitchen",
    "Front"
  ];

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/designs/public"
        );
        const data = await response.json();

        setDesigns(data);
        setFilteredDesigns(data);
      } catch {
        setError("Failed to load designs.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredDesigns(designs);
    } else {
      setFilteredDesigns(
        designs.filter((d) => d.category === selectedCategory)
      );
    }
  }, [selectedCategory, designs]);

  useEffect(() => {
    const fetchLikes = async () => {
      const newLikes = {};

      for (let d of designs) {
        const res = await fetch(`http://localhost:8080/api/likes/${d.id}`);
        const count = await res.text();
        newLikes[d.id] = count;
      }

      setLikes(newLikes);
    };

    if (designs.length > 0) fetchLikes();
  }, [designs]);

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

        {/* FILTER */}
        <div className="filter-container">
          <label>Filter by Category</label>
          <select
            className="filter-dropdown"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div className="design-grid">
          {filteredDesigns.map((design) => (
            <div className="design-card" key={design.id}>
              <img
                src={`http://localhost:8080/uploads/${design.imagePath}`}
                className="design-image"
                alt="design"
                onClick={() => {
                  console.log("Image clicked"); // DEBUG
                  setSelectedImage(
                    `http://localhost:8080/uploads/${design.imagePath}`
                  );
                }}
              />

              <div style={{ marginTop: "8px", textAlign: "center" }}>
                <button
                  onClick={async () => {
                    const user = JSON.parse(localStorage.getItem("user"));

                    await fetch(`http://localhost:8080/api/likes/${design.id}/${user.id}`, {
                      method: "POST",
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                      }
                    });

                    // refresh count
                    const res = await fetch(`http://localhost:8080/api/likes/${design.id}`);
                    const count = await res.text();

                    setLikes((prev) => ({
                      ...prev,
                      [design.id]: count
                    }));

                    setLiked((prev) => ({
                      ...prev,
                      [design.id]: !prev[design.id]
                    }));
                  }}
                >
                  <span style={{
                    color: liked[design.id] ? "red" : "gray",
                    fontSize: "18px",
                    fontWeight: "600"
                  }}>
                    ❤️ {likes[design.id] || 0}
                  </span>
                </button>
              </div>

              <div className="design-body">
                <h3>{design.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
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