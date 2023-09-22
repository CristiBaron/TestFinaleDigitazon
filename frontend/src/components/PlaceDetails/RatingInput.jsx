import React, { useState } from "react";

const RatingInput = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="flex flex-col items-center">
      <label className="block text-gray-700 ">Dai la tua valutazione:</label>
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => handleRatingChange(star)}
          >
            &#9733; {/* Carattere della stella Unicode */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default RatingInput;
