import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";

const StarRating = ({ rating }) => {
  const MAX_STARS = 5;
  const getStars = () => {
    const stars = [];
    for (let i = 1; i <= MAX_STARS; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<IoIosStar key={i} />);
      } else if (i - rating <= 0.5) {
        stars.push(<IoIosStarHalf key={i} />);
      } else {
        stars.push(<IoIosStarOutline key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-2 font-medium">
      {rating?.toFixed(1)}
      <div className="flex text-lg text-rating">{getStars()}</div>
    </div>
  );
};

export default StarRating;
