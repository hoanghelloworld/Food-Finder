import { FaStar } from 'react-icons/fa';
import React, { useState } from 'react';

function SelectRating({ onRatingChange }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <div className='px-2'>
      <h2 className='font-bold text-sm'>Select Rating</h2>
      <div className='flex flex-col items-start'>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={20}
            className='cursor-pointer'
            color={star <= (hoveredRating || selectedRating) ? 'orange' : 'grey'}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            onClick={() => {
            setSelectedRating(star);
            onRatingChange(star);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default SelectRating;
