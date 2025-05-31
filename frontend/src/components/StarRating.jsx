import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { useState } from "react";

const StarRating = ({
  rating = 0,
  interactive = false,
  onRatingChange,
  size = "text-lg",
  showRating = true,
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const MAX_STARS = 5;

  const getStars = () => {
    const stars = [];
    const ratingValue = Number(rating) || 0;

    for (let i = 1; i <= MAX_STARS; i++) {
      if (interactive) {
        stars.push(
          <button
            key={i}
            type="button"
            className={`${size} transition-all duration-200 ${
              i <= (hoveredRating || rating)
                ? "scale-110 text-rating"
                : "text-gray-300"
            } hover:scale-110 hover:text-rating`}
            onClick={() => onRatingChange?.(i)}
            onMouseEnter={() => setHoveredRating(i)}
            onMouseLeave={() => setHoveredRating(0)}
          >
            <IoIosStar />
          </button>,
        );
      } else {
        if (i <= Math.floor(ratingValue)) {
          stars.push(<IoIosStar key={i} className={`${size} text-rating`} />);
        } else if (i - ratingValue <= 0.5) {
          stars.push(
            <IoIosStarHalf key={i} className={`${size} text-rating`} />,
          );
        } else {
          stars.push(
            <IoIosStarOutline key={i} className={`${size} text-rating`} />,
          );
        }
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2 text-sm font-medium text-secondary/70">
      {!interactive && showRating && (rating ? rating.toFixed(1) : "0.0")}
      <div className="flex text-lg">{getStars()}</div>
      {interactive && rating > 0 && (
        <span className="ml-3 text-sm font-medium text-secondary/70">
          {rating} out of 5 stars
        </span>
      )}
    </div>
  );
};

export default StarRating;
