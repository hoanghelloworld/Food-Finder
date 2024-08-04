import { FaStar } from 'react-icons/fa';
import React, { useState } from 'react';

function SelectRating({ onRatingChange }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoveredRow, setHoveredRow] = useState(0);

  return (
    <div className="p-4">
      <h2 className="font-bold text-sm mb-2">Select Rating</h2>
      <div className="flex flex-col items-start space-y-1">
        {[1, 2, 3, 4, 5].map((rating) => (
          <div
            key={rating}
            className="flex items-center cursor-pointer"
            onMouseEnter={() => setHoveredRow(rating)}
            onMouseLeave={() => setHoveredRow(0)}
            onClick={() => {
              setSelectedRating(rating);
              onRatingChange(rating);
            }}
          >
            {[...Array(rating)].map((_, index) => (
              <FaStar
                key={index}
                size={20}
                color={hoveredRow === rating || selectedRating === rating ? 'orange' : 'grey'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectRating;
