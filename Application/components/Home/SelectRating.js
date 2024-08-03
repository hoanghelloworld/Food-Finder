import Data from '@/Shared/Data';
import React, { useState } from 'react';

function SelectRating({ onRatingChange }) {
  const [selectedRating, setSelectedRating] = useState([]);

  const onSelectRating = (isChecked, value) => {
    let updatedRatings;
    if (isChecked) {
      updatedRatings = [...selectedRating, value];
    } else {
      updatedRatings = selectedRating.filter((n) => n !== value);
    }
    setSelectedRating(updatedRatings);
    onRatingChange(updatedRatings);
  };

  return (
    <div className='px-2 mt-5'>
      <h2 className='font-bold'>Select Rating</h2>
      <div>
        {Data.ratingList.map((item, index) => (
          <div key={index} className='flex justify-between'>
            <label>{item.icon}</label>
            <input
              type='checkbox'
              onChange={(e) => onSelectRating(e.target.checked, item.name)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectRating;