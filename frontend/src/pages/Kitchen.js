import React, { useState } from "react";

function Kitchen() {
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <main className="banner">
      <section className="content">
        <h1>Kitchen Designs</h1>

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

export default Kitchen;