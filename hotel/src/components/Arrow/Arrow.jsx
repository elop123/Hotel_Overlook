import React, { useState } from "react";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";

export const Arrow = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={toggleExpand}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "2rem",
          color: "#007bff",
        }}
      >
        {expanded ? <FiArrowUpCircle /> : <FiArrowDownCircle />}
      </button>
      <div style={{ marginTop: "20px" }}>
        {expanded && <p>This is the expanded content!</p>}
      </div>
    </div>
  );
};


