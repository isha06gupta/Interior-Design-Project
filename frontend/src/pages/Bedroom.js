import React from "react";

function Bedroom() {

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

  return (
    <main className="banner" style={{ marginTop: "20px" }}>
      <section className="content">
        <h1>Bedroom Designs</h1>

        <div className="design-grid">
          {designs.map((design, index) => (
            <div className="design-card" key={index}>
              <img
                src={design.img}
                className="design-image"
                alt={design.title}
              />
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

export default Bedroom;