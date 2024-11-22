import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchTopicDetailsByName } from "../api"; // Update the API call to fetch by name
import ReactMarkdown from "react-markdown";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./css/Display.css";

function Display({ selectedTopic }) {
  const { topicName } = useParams(); // Get topicName from the URL
  const [topic, setTopic] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const loadTopicDetails = async () => {
      if (topicName) {
        setLoading(true);
        try {
          const data = await fetchTopicDetailsByName(topicName); // Fetch topic by name
          setTopic(data);
          setError(null);
        } catch {
          setError("Failed to load topic details. Please try again.");
        } finally {
          setLoading(false);
        }
      }
    };
    loadTopicDetails();
  }, [topicName]); // Re-run when topicName changes

  const handleCopy = (index) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderCodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    const codeContent = String(children).replace(/\n$/, "");

    return !inline && match ? (
      <div className="code-block">
        <pre className={className} {...props}>
          <code>{codeContent}</code>
        </pre>
        <CopyToClipboard
          text={codeContent}
          onCopy={() => handleCopy(children.toString())}
        >
          <button className="copy-button" aria-label="Copy code block">
            Copy
          </button>
        </CopyToClipboard>
        {copiedIndex === children.toString() && (
          <span className="copied-text" role="alert">
            Copied!
          </span>
        )}
      </div>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  };

  if (!topicName) return <div className="no-selection">Select a topic.</div>;
  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="topic-content">
      <h1>{topic?.name}</h1>
      <ReactMarkdown components={{ code: renderCodeBlock }}>
        {topic?.description}
      </ReactMarkdown>
      {topic?.videoLink && (
        <div className="video-container">
          <iframe
            src={topic.videoLink}
            title={topic.name}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {topic?.referenceLink && (
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
  );
}

export default Display;
