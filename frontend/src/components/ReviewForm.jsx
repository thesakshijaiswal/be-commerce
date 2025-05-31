import { useState } from "react";
import { Button, StarRating } from "./";

const ReviewForm = ({ onSubmit, onCancel, isSubmitting }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ rating, comment });
  };

  return (
    <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Write Your Review
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Overall Rating
          </label>
          <StarRating
            rating={rating}
            interactive={true}
            onRatingChange={setRating}
            size="text-2xl"
          />
        </div>

        <div>
          <label
            htmlFor="comment"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Add a written review
          </label>
          <textarea
            id="comment"
            rows="4"
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-secondary focus:border-transparent focus:ring-2 focus:ring-primary"
            placeholder="What did you like or dislike? What did you use this product for?"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <p className="mt-1 text-xs text-gray-500">
            Minimum 10 characters required
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={
              isSubmitting || rating === 0 || comment.trim().length < 10
            }
            className="rounded-lg px-6 py-2 font-medium text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            className="rounded-lg px-6 py-2 font-medium text-gray-700"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
