import React, { useState, useEffect } from "react";

function Living() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchText, setSearchText] = useState("");

  const designs = [
    { img: "/images/living/living1.jpg", title: "Modern Living Room" },
    { img: "/images/living/living2.jpg", title: "Luxury Sofa Setup" },
    { img: "/images/living/living3.jpg", title: "Minimal Living Space" },
    { img: "/images/living/living4.jpg", title: "Warm Lighting Living Room" },
    { img: "/images/living/living5.jpg", title: "Elegant Interior Living Room" },
    { img: "/images/living/living6.jpg", title: "Contemporary Living Area" },
    { img: "/images/living/living7.jpg", title: "Indian Style Living Room" },
    { img: "/images/living/living8.jpg", title: "Premium Living Space" },
    { img: "/images/living/living9.jpg", title: "Compact Living Room" },
    { img: "/images/living/living10.jpg", title: "Stylish TV Unit Setup" },
    { img: "/images/living/living11.jpg", title: "Modern Wooden Interior" },
    { img: "/images/living/living12.jpg", title: "Aesthetic Living Room" }
  ];

  // ✅ SEARCH LISTENER
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
        <h1>Living Room Designs</h1>

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

export default Living;