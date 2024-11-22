import React, { useEffect, useState } from 'react';
import { fetchTopics } from '../api';
import ReactMarkdown from 'react-markdown';

// Function to render code blocks
const renderCodeBlock = ({ language, value }) => {
  return <pre>{value}</pre>;
};

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetchTopics()
      .then(setTopics)
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Topics</h1>
      <ul>
        {topics.map(topic => (
          <li key={topic._id}>
            <div className="topic-content">
              <h2>{topic.name}</h2>
              <ReactMarkdown components={{ code: renderCodeBlock }}>
                {topic.description}
              </ReactMarkdown>
              {topic.videoLink && (
                <div className="video-container">
                  <iframe
                    src={topic.videoLink}
                    title={topic.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              {topic.referenceLink && (
                <div>
                  <h3>References:</h3>
                  <ul>
                    {topic.referenceLink.split(",").map((ref, index) => (
                      <li key={index}>
                        <a href={ref} target="_blank" rel="noopener noreferrer">
                          {ref}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;
