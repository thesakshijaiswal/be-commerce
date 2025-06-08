import { useState, useMemo } from "react";

const ReviewFilter = ({ reviews, onSort }) => {
  const [sortOption, setSortOption] = useState("Most Recent");

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews];
    switch (sortOption) {
      case "Highest Rated":
        return sorted.sort((a, b) => b.rating - a.rating);
      case "Lowest Rated":
        return sorted.sort((a, b) => a.rating - b.rating);
      case "Most Helpful":
        return sorted;
      case "Most Recent":
      default:
        return sorted.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
    }
  }, [reviews, sortOption]);

  onSort(sortedReviews);

  return (
    <div className="flex items-center gap-2">
      <label className="sr-only" htmlFor="sort-reviews">
        Sort Reviews
      </label>
      <select
        id="sort-reviews"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm text-secondary focus:ring-2 focus:ring-secondary"
      >
        <option value="Most Recent">Most Recent</option>
        <option value="Highest Rated">Highest Rated</option>
        <option value="Lowest Rated">Lowest Rated</option>
        <option value="Most Helpful">Most Helpful</option>
      </select>
    </div>
  );
};

export default ReviewFilter;
