import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";
import {
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsCheckCircleFill,
} from "react-icons/bs";
import Button from "../components/Button";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../features/productsApiSlice";

const ProductReview = () => {
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.user);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: product, refetch } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: isSubmittingReview }] =
    useCreateReviewMutation();

  const submitReviewHandler = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      toast.error("Please login to write a review");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      const res = await createReview({
        productId,
        rating,
        comment: comment.trim(),
      }).unwrap();

      toast.success(res.message || "Review submitted successfully!");
      setRating(0);
      setComment("");
      setShowReviewForm(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit review");
    }
  };

  const renderStars = (rating, interactive = false, size = "text-lg") => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
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
            onClick={() => setRating(i)}
            onMouseEnter={() => setHoveredRating(i)}
            onMouseLeave={() => setHoveredRating(0)}
          >
            <FaStar />
          </button>,
        );
      } else {
        if (i <= fullStars) {
          stars.push(<BsStarFill key={i} className={`${size} text-rating`} />);
        } else if (i === fullStars + 1 && hasHalfStar) {
          stars.push(<BsStarHalf key={i} className={`${size} text-rating`} />);
        } else {
          stars.push(<BsStar key={i} className={`${size} text-gray-300`} />);
        }
      }
    }

    return <div className="flex items-center gap-1">{stars}</div>;
  };

  const getRatingDistribution = () => {
    if (!product?.reviews || product.reviews.length === 0) return [];

    const distribution = [0, 0, 0, 0, 0];
    product.reviews.forEach((review) => {
      const rating = review.rating || review.ratings;
      if (rating >= 1 && rating <= 5) {
        distribution[rating - 1]++;
      }
    });

    return distribution.reverse().map((count, index) => ({
      stars: 5 - index,
      count,
      percentage: Math.round((count / product.reviews.length) * 100),
    }));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  if (!product) return null;

  const ratingDistribution = getRatingDistribution();
  const averageRating = product.rating || 0;
  const totalReviews = product.numReviews || 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="px-6 py-8">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">
            Customer Reviews
          </h2>

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center lg:items-start">
              <div className="mb-4 flex items-center gap-4">
                <div className="text-5xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex flex-col">
                  <div className="mb-1 flex items-center gap-1">
                    {renderStars(averageRating, false, "text-xl")}
                  </div>
                  <p className="text-sm text-gray-600">
                    Based on {totalReviews} review
                    {totalReviews !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {userInfo ? (
                <Button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-6 py-2 font-medium"
                >
                  {showReviewForm ? "Cancel Review" : "Write a Review"}
                </Button>
              ) : (
                <Link to="/login">
                  <Button>Sign in to Review</Button>
                </Link>
              )}
            </div>

            <div className="space-y-2">
              {ratingDistribution.map((item) => (
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
                  <span className="w-8 text-sm text-gray-600">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {showReviewForm && userInfo && (
            <div className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Write Your Review
              </h3>
              <form onSubmit={submitReviewHandler} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Overall Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {renderStars(rating, true, "text-2xl")}
                    {rating > 0 && (
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {rating} out of 5 stars
                      </span>
                    )}
                  </div>
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
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm text-secondary focus:border-transparent focus:ring-2 focus:ring-yellow-400"
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
                      isSubmittingReview ||
                      rating === 0 ||
                      comment.trim().length < 10
                    }
                    className="rounded-lg px-6 py-2 font-medium text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmittingReview ? "Submitting..." : "Submit Review"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="rounded-lg px-6 py-2 font-medium text-gray-700"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="px-6 py-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Top Reviews
              </h3>
              {totalReviews > 0 && (
                <select className="rounded-md border border-gray-300 px-3 py-1 text-sm text-secondary focus:border-transparent focus:ring-2 focus:ring-secondary">
                  <option>Most Recent</option>
                  <option>Most Helpful</option>
                  <option>Highest Rated</option>
                  <option>Lowest Rated</option>
                </select>
              )}
            </div>

            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-6">
                {product.reviews.map((review, index) => (
                  <div
                    key={review._id || index}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-sm font-medium text-white">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">
                            {review.name}
                          </h4>
                          <BsCheckCircleFill className="text-xs text-green-500" />
                          <span className="text-xs text-gray-500">
                            Verified Purchase
                          </span>
                        </div>

                        <div className="mb-3 flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            {renderStars(
                              review.rating || review.ratings,
                              false,
                              "text-sm",
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {review.rating || review.ratings} out of 5 stars
                          </span>
                        </div>

                        <p className="mb-3 text-sm leading-relaxed text-gray-700">
                          {review.comment || review.Comment}
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Reviewed on{" "}
                            {formatDate(review.createdAt || Date.now())} •{" "}
                            {getTimeAgo(review.createdAt || Date.now())}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <FaStar className="text-xl text-gray-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No reviews yet
                </h3>
                <p className="mb-4 text-gray-500">
                  Be the first to share your thoughts about this product
                </p>
                {userInfo ? (
                  <Button
                    onClick={() => setShowReviewForm(true)}
                    className="rounded-lg bg-yellow-400 px-6 py-2 font-medium text-gray-900 hover:bg-yellow-500"
                  >
                    Write the First Review
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button className="rounded-lg bg-yellow-400 px-6 py-2 font-medium text-gray-900 hover:bg-yellow-500">
                      Sign in to Write Review
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
