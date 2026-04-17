import React from "react";

function Living() {

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

  return (
    <main className="banner" style={{ marginTop: "20px" }}>
      <section className="content">
        <h1>Living Room Designs</h1>

        <div className="design-grid">
          {designs.map((design, index) => (
            <div className="design-card" key={index}>
              <img src={design.img} className="design-image" alt={design.title} />
              <div className="design-body">
                <h3>{design.title}</h3>
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}

export default Living;