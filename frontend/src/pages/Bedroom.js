import React, { useState, useEffect } from "react";

function Bedroom() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchText, setSearchText] = useState("");

  const designs = [
    { img: "/images/bedroom/bedroom1.jpg", title: "Cozy Wooden Bedroom" },
    { img: "/images/bedroom/bedroom2.jpg", title: "Minimal White Bedroom" },
    { img: "/images/bedroom/bedroom3.jpg", title: "Luxury King Size Bedroom" },
    { img: "/images/bedroom/bedroom4.jpg", title: "Warm Lighting Bedroom" },
    { img: "/images/bedroom/bedroom5.jpg", title: "Modern Green Theme Bedroom" },
    { img: "/images/bedroom/bedroom6.jpg", title: "Compact City Bedroom" },
    { img: "/images/bedroom/bedroom7.jpg", title: "Classic Indian Bedroom" },
    { img: "/images/bedroom/bedroom8.jpg", title: "Elegant Beige Bedroom" },
    { img: "/images/bedroom/bedroom9.jpg", title: "Contemporary Bedroom" },
    { img: "/images/bedroom/bedroom10.jpg", title: "Soft Pastel Bedroom" },
    { img: "/images/bedroom/bedroom11.jpg", title: "Premium Interior Bedroom" },
    { img: "/images/bedroom/bedroom12.jpg", title: "Aesthetic Bedroom Design" }
  ];

  // ✅ SEARCH LISTENER
  useEffect(() => {
    const handleSearch = (e) => {
      setSearchText(e.detail.toLowerCase());
    };

    window.addEventListener("search", handleSearch);
    return () => window.removeEventListener("search", handleSearch);
  }, []);

  // ✅ FILTERED DATA
  const filteredDesigns = designs.filter((design) =>
    design.title.toLowerCase().includes(searchText)
  );

  return (
    <main className="banner">
      <section className="content">
        <h1>Bedroom Designs</h1>

        <div className="design-grid">
          {filteredDesigns.map((design, index) => (
            <div className="design-card" key={index}>
              <img
                src={design.img}
                className="design-image"
                alt={design.title}
                onClick={() => setSelectedImage(design.img)}
              />
              <div className="design-body">
                <h3>{design.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Optional UX */}
        {filteredDesigns.length === 0 && (
          <p style={{ marginTop: "20px" }}>No results found</p>
        )}
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

export default Bedroom;