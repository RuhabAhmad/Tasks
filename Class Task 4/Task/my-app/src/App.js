import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Basic styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  nav: {
    backgroundColor: "#333",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    marginTop: "20px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

// Home Component
function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Home</h1>
        <p>Welcome to our React Router application!</p>
      </div>
    </div>
  );
}

// About Component
function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>About</h1>
        <p>This application demonstrates client-side routing and a controlled form using React.</p>
      </div>
    </div>
  );
}

// Contact Component
function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { name, email, message };
    console.log("Form Submitted:", formData);

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Contact</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={{ ...styles.input, height: "100px" }}
            required
          />

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// Navbar Component
function Navbar() {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.navLink}>Home</Link>
      <Link to="/about" style={styles.navLink}>About</Link>
      <Link to="/contact" style={styles.navLink}>Contact</Link>
    </nav>
  );
}

// Main App
export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}