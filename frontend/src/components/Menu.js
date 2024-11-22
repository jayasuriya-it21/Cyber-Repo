import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Menu.css";

function Menu({ onSelectTopic, topics }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleTopicSelect = (topicName) => {
    setSelectedTopic(topicName);
    onSelectTopic(topicName);
    setIsMenuOpen(false); // Close menu on topic selection in mobile view
  };

  // Helper function to format topic name for the URL
  const formatTopicNameForURL = (name) => {
    return name.replace(/\s+/g, '-').toLowerCase(); // Replace spaces with hyphens and convert to lowercase
  };

  return (
    <div>
      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMenuOpen ? "✕" : "☰ Topics"}
      </button>
      <div
        className={`sidebar ${isMenuOpen ? "open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <ul className="menu" role="menu">
          {topics.map((topic) => (
            <li
              key={topic._id}
              className={`topic ${selectedTopic === topic.name ? "active" : ""}`}
              onClick={() => handleTopicSelect(topic.name)}
              role="menuitem"
              aria-selected={selectedTopic === topic.name}
            >
              {/* Generate link using formatted topic name */}
              <Link to={`/courses/${topic.category.toLowerCase()}/${formatTopicNameForURL(topic.name)}`}>
                {topic.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Menu;
