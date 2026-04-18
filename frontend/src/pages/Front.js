import React, { useState } from "react";

function Front() {
  const [selectedImage, setSelectedImage] = useState(null);

  const designs = [
    { img: "/images/front/front1.jpg", title: "Modern Villa Exterior" },
    { img: "/images/front/front2.jpg", title: "Luxury Front Elevation" },
    { img: "/images/front/front3.jpg", title: "Minimal House Front" },
    { img: "/images/front/front4.jpg", title: "Contemporary Exterior Design" },
    { img: "/images/front/front5.jpg", title: "Classic Indian House Front" },
    { img: "/images/front/front6.jpg", title: "Glass Finish Exterior" },
    { img: "/images/front/front7.jpg", title: "Duplex Front Design" },
    { img: "/images/front/front8.jpg", title: "Modern Balcony Front" },
    { img: "/images/front/front9.jpg", title: "Simple Elegant Exterior" },
    { img: "/images/front/front10.jpg", title: "White Theme Front Design" },
    { img: "/images/front/front11.jpg", title: "Premium Elevation Style" },
    { img: "/images/front/front12.jpg", title: "Urban Home Exterior" }
  ];

  return (
    <main className="banner">
      <section className="content">
        <h1>Front Designs</h1>

        <div className="design-grid">
          {designs.map((design, index) => (
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
      </section>

      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="full" />
          </div>
        </div>
      )}
    </main>
  );
}

export default Front;