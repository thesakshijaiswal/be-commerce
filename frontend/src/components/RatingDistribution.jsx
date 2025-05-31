import { BsStarFill } from "react-icons/bs";

const RatingDistribution = ({ reviews = [] }) => {
  const getRatingDistribution = () => {
    if (!reviews.length) return [];

    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      const rating = review.rating || review.ratings;
      if (rating >= 1 && rating <= 5) {
        distribution[rating - 1]++;
      }
    });

    return distribution.reverse().map((count, index) => ({
      stars: 5 - index,
      count,
      percentage: Math.round((count / reviews.length) * 100),
    }));
  };

  return (
    <div className="space-y-2">
      {getRatingDistribution().map((item) => (
        <div key={item.stars} className="flex items-center gap-3">
          <span className="w-6 text-sm font-medium text-gray-700">
            {item.stars}
          </span>
          <BsStarFill className="text-sm text-rating" />
          <div className="h-2 flex-1 rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-rating transition-all duration-500"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
          <span className="w-8 text-sm text-gray-600">{item.percentage}%</span>
        </div>
      ))}
    </div>
  );
};

export default RatingDistribution;
