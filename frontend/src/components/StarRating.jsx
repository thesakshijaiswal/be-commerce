import React from "react";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const StarRating = ({ starRating }) => {
  const MAX_STARS = 5;
  const getStars = () => {
    const stars = [];
    for (let i = 1; i <= MAX_STARS; i++) {
      if (i <= Math.floor(starRating)) {
        stars.push(<IoIosStar key={i} />); // Full star
      } else if (i - starRating <= 0.5) {
        stars.push(<IoIosStarHalf key={i} />); // Half star
      } else {
        stars.push(<IoIosStarOutline key={i} />); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2 font-medium">
      {starRating}
      <div className="flex text-lg text-rating">{getStars()}</div>
    </div>
  );
};

export default StarRating;
