import { useState } from "react";

function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = "919861955811";

    const text = `Hello,
Name: ${form.name}
Email: ${form.email}
Subject: ${form.subject}
Message: ${form.message}`;

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`);
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      {/* CONTACT INFO */}
      <div className="bg-gray-100 p-6 rounded-lg mb-10">

        <h2 className="text-2xl font-bold mb-4">CONTACT INFO</h2>

        <p className="text-gray-600 mb-4">
          Gurukrupa Enterprises provides authentic spiritual and Ayurvedic products.
          We are dedicated to quality, purity, and customer satisfaction.
        </p>

        <p className="mb-2">📍 Plot No. 368, Lane-3, Sector-5</p>
        <p className="mb-2">Niladri Vihar, Sailashree Vihar</p>
        <p className="mb-2">Bhubaneswar, Odisha - 751021</p>

        <p className="mt-4">📞 Phone: +91 98619 55811</p>
        <p>📧 Email: Gurukrupaenterpriser@gmail.com</p>
        <p className="mt-2">👤 Owner: SAI PRASANNA DAS</p>

      </div>

      {/* FORM */}
      <div>

        <h2 className="text-2xl font-bold mb-6">GET IN TOUCH</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="w-full border p-3 rounded"
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full border p-3 rounded h-32"
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600"
          >
            Send Message
          </button>

        </form>

      </div>

    </div>
  );
}

export default Contact;