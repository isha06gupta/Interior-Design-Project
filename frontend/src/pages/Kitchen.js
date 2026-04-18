import React, { useState, useEffect } from "react";

function Kitchen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchText, setSearchText] = useState("");

  const designs = [
    { img: "/images/kitchen/kitchen1.jpg", title: "Modular Kitchen Design" },
    { img: "/images/kitchen/kitchen2.jpg", title: "Open Kitchen Layout" },
    { img: "/images/kitchen/kitchen3.jpg", title: "Dark Theme Kitchen" },
    { img: "/images/kitchen/kitchen4.jpg", title: "Minimal White Kitchen" },
    { img: "/images/kitchen/kitchen5.jpg", title: "Luxury Kitchen Setup" },
    { img: "/images/kitchen/kitchen6.jpg", title: "Indian Style Kitchen" },
    { img: "/images/kitchen/kitchen7.jpg", title: "Modern Compact Kitchen" },
    { img: "/images/kitchen/kitchen8.jpg", title: "Wood Finish Kitchen" },
    { img: "/images/kitchen/kitchen9.jpg", title: "L-Shaped Kitchen" },
    { img: "/images/kitchen/kitchen10.jpg", title: "Bright Interior Kitchen" },
    { img: "/images/kitchen/kitchen11.jpg", title: "Elegant Kitchen Space" },
    { img: "/images/kitchen/kitchen12.jpg", title: "Premium Modular Kitchen" }
  ];

  // ✅ LISTEN TO NAVBAR SEARCH
  useEffect(() => {
    const handleSearch = (e) => {
      setSearchText(e.detail.toLowerCase());
    };

    window.addEventListener("search", handleSearch);
    return () => window.removeEventListener("search", handleSearch);
  }, []);

  // ✅ FILTER LOGIC
  const filteredDesigns = designs.filter((design) =>
    design.title.toLowerCase().includes(searchText)
  );

  return (
    <main className="banner">
      <section className="content">
        <h1>Kitchen Designs</h1>

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

      {/* ✅ MODAL */}
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

export default Kitchen;