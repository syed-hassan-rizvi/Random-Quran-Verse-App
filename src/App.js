import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="about">
      <h2>About Us</h2>
      <p>
        Welcome to the Random Quran Verse application! This app is designed to provide users with random verses from the Quran, promoting reflection and spiritual growth.
      </p>
      <p>
        Our mission is to make the Quran accessible to everyone, encouraging daily inspiration and a deeper understanding of its teachings. Whether you're looking for guidance, motivation, or simply a moment of peace, our app is here to help.
      </p>
      <h3>Features:</h3>
      <ul>
        <li>Randomly fetch verses from the Quran with translations.</li>
        <li>Toggle between light and dark modes for a comfortable reading experience.</li>
        <li>Simple and intuitive user interface for easy navigation.</li>
      </ul>
      <h3>Get Involved:</h3>
      <p>
        We believe in community engagement and would love to hear your feedback. If you have suggestions or ideas for improvement, please feel free to reach out!
      </p>
      <p>
        Thank you for using our app, and may it bring you inspiration and insight!
      </p>
    </div>
  );
};

function App() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Light Mode is default

  const fetchVerse = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://api.quran.com/api/v4/verses/random?language=en&translations=131');
      const jsonData = await response.json();
      setVerse(jsonData.verse);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching random verse:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  // Handle Dark Mode toggle
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle between light and dark mode
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/">Random Quran Verse</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About Us</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={
              <>
                <h1 className="my-4">Random Quran Verse</h1>
                {loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : verse ? (
                  <div className="card p-4 shadow">
                    <p className="verse-key">
                      <i className="fas fa-key"></i>
                      <strong> Verse Key:</strong> {verse.verse_key}
                    </p>
                    <p className="verse-key">
                      <i className="fas fa-book"></i>
                      <strong> Page Number:</strong> {verse.page_number}
                    </p>
                    <h3>
                      <i className="fas fa-comments"></i>
                      Translation:
                    </h3>
                    <div className="translations-container">
                      {verse.translations && verse.translations.length > 0 ? (
                        verse.translations.map((translation, index) => (
                          <div key={index} className="translation-text mb-3">
                            <strong>{translation.resource_name}</strong> {translation.text}
                          </div>
                        ))
                      ) : (
                        <p>No translations available.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p>Could not fetch the verse. Please try again.</p>
                )}
                {/* Centered Button */}
                <div className="d-flex justify-content-center mt-4">
                  <button onClick={fetchVerse} className="btn btn-primary">Fetch New Verse</button>
                </div>
              </>
            } />
            <Route path="/about" element={<About />} />
          </Routes>

          {/* Toggle Switch for Mode Selection */}
          <div className="mode-toggle mt-4">
            <label className="switch">
              <input type="checkbox" onChange={toggleDarkMode} checked={darkMode} />
              <span className="slider"></span>
            </label>
            <span className="mode-label">{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
