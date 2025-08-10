// RejectModal.jsx
import React, { useState } from "react";

const RejectModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState("");
  const [suggestions, setSuggestions] = useState(["", "", ""]);

  const handleSuggestionChange = (index, value) => {
    const updated = [...suggestions];
    updated[index] = value;
    setSuggestions(updated);
  };

  const handleSubmit = () => {
    if (!reason.trim()) return alert("Please provide a reason.");
    onSubmit({ reason, suggestions: suggestions.filter(s => s.trim() !== "") });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Reject Appointment</h2>

        <label className="block font-medium mb-1">Reason</label>
        <textarea
          className="w-full border p-2 rounded mb-4"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <label className="block font-medium mb-2">Suggest Alternative Times (optional)</label>
        {suggestions.map((slot, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Suggestion ${index + 1}`}
            value={slot}
            onChange={(e) => handleSuggestionChange(index, e.target.value)}
            className="w-full border p-2 rounded mb-2"
          />
        ))}

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="text-gray-500 hover:underline">Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default RejectModal;
