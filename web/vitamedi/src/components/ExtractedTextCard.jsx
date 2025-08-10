// src/components/ExtractedTextCard.jsx
import { useState } from "react";

const highlightKeywords = (text) => {
  const keywords = ["positive", "negative", "high", "low", "glucose", "covid"];
  const regex = new RegExp(`\\b(${keywords.join("|")})\\b`, "gi");

  return text.split(regex).map((part, index) =>
    keywords.includes(part.toLowerCase()) ? (
      <span key={index} className="bg-yellow-200 font-bold text-red-600">
        {part}
      </span>
    ) : (
      part
    )
  );
};

const ExtractedTextCard = ({ extractedText }) => {
  const [expanded, setExpanded] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    alert("Copied to clipboard");
  };

  return (
    <div className="mt-2 bg-gray-100 rounded p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-gray-700 text-lg">🧾 Extracted Text</h3>
        <div className="space-x-3">
          <button
            className="text-sm text-blue-600 underline"
            onClick={handleCopy}
          >
            Copy
          </button>
          <button
            className="text-sm text-gray-600 underline"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      {expanded && (
        <pre className="text-sm font-mono whitespace-pre-wrap text-black max-h-60 overflow-y-auto">
          {highlightKeywords(extractedText)}
        </pre>
      )}
    </div>
  );
};

export default ExtractedTextCard;
