import React, { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="banner">
      <section className="content" style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <h1>Contact Us</h1>

        <p className="contact-subtext">
          Have a question or want to collaborate?  
          We’d love to hear from you.
        </p>

        {/* CONTACT INFO */}
        <div className="contact-info">
          <div>
            <h3>📍 Location</h3>
            <p>India</p>
          </div>

          <div>
            <h3>📧 Email</h3>
            <p>support@interiordesign.com</p>
          </div>

          <div>
            <h3>📞 Phone</h3>
            <p>+91 9876543210</p>
          </div>
        </div>

        {/* FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>

        </form>

      </section>
    </main>
  );
}

export default Contact;