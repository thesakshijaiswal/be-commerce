import { useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { Button, StarRating, RatingDistribution } from "../components";
import ReviewForm from "../components/ReviewForm";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../features/productsApiSlice";

const ProductReview = () => {
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.user);
  const [showReviewForm, setShowReviewForm] = useState(false);

  const { data: product, refetch } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: isSubmittingReview }] =
    useCreateReviewMutation();

  const toggleReviewForm = useCallback(() => {
    setShowReviewForm((prev) => !prev);
  }, []);

  const submitReviewHandler = useCallback(
    async ({ rating, comment }) => {
      if (!userInfo) {
        toast.error("Please login to write a review");
        return;
      }

      try {
        const res = await createReview({
          productId,
          rating,
          comment: comment.trim(),
        }).unwrap();

        toast.success(res.message || "Review submitted successfully!");
        setShowReviewForm(false);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || "Failed to submit review");
      }
    },
    [createReview, productId, refetch, userInfo],
  );

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  const getTimeAgo = useCallback((dateString) => {
    const now = new Date();
    const reviewDate = new Date(dateString);
    const diffInDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  }, []);

  const averageRating = product?.rating || 0;
  const totalReviews = product?.numReviews || 0;

  const reviews = useMemo(() => product?.reviews || [], [product]);

  if (!product) return null;

  return (
    <section
      className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
      aria-labelledby="customer-reviews-heading"
    >
      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="px-6 py-8">
          <h2
            id="customer-reviews-heading"
            className="mb-6 text-2xl font-bold text-gray-900"
          >
            Customer Reviews
          </h2>

          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex flex-col items-center lg:items-start">
              <div
                className="mb-4 flex items-center gap-4"
                aria-label={`Average rating ${averageRating.toFixed(1)}`}
              >
                <div className="text-5xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex flex-col">
                  <StarRating
                    rating={averageRating}
                    size="text-xl"
                    showRating={false}
                  />
                  <p className="text-sm text-gray-600">
                    Based on {totalReviews} review
                    {totalReviews !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {userInfo ? (
                <Button
                  onClick={toggleReviewForm}
                  className="px-6 py-2 font-medium"
                  aria-expanded={showReviewForm}
                  aria-controls="review-form"
                >
                  {showReviewForm ? "Cancel Review" : "Write a Review"}
                </Button>
              ) : (
                <Link to="/login">
                  <Button>Sign in to Review</Button>
                </Link>
              )}
            </div>

            <RatingDistribution reviews={reviews} />
          </div>

          {showReviewForm && userInfo && (
            <div id="review-form">
              <ReviewForm
                onSubmit={submitReviewHandler}
                onCancel={() => setShowReviewForm(false)}
                isSubmitting={isSubmittingReview}
              />
            </div>
          )}

          <div className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Top Reviews
              </h3>
              {totalReviews > 0 && (
                <>
                  <label className="sr-only" htmlFor="sort-reviews">
                    Sort Reviews
                  </label>
                  <select
                    id="sort-reviews"
                    className="rounded-md border border-gray-300 px-3 py-1 text-sm text-secondary focus:ring-2 focus:ring-secondary"
                  >
                    <option>Most Recent</option>
                    <option>Most Helpful</option>
                    <option>Highest Rated</option>
                    <option>Lowest Rated</option>
                  </select>
                </>
              )}
            </div>

            {reviews.length > 0 ? (
              <ul className="space-y-6" role="list">
                {reviews.map((review, index) => (
                  <li
                    key={review._id || index}
                    className="border-b border-gray-100 pb-6 last:border-b-0"
                    aria-label={`Review by ${review.name}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/70 text-sm font-medium text-white"
                          aria-hidden="true"
                        >
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <h4 className="font-medium text-gray-900">
                            {review.name}
                          </h4>
                          <BsCheckCircleFill
                            className="text-xs text-green-500"
                            aria-hidden="true"
                          />
                          <span className="text-xs text-gray-500">
                            Verified Purchase
                          </span>
                        </div>

                        <div className="mb-3 flex items-center gap-3">
                          <StarRating rating={review.rating} size="text-sm" />
                        </div>

                        <p className="mb-3 text-sm leading-relaxed text-gray-700">
                          {review.comment}
                        </p>

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">
                            Reviewed on {formatDate(review.createdAt)} •{" "}
                            {getTimeAgo(review.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="py-12 text-center" role="status">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                  <FaStar
                    className="text-xl text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No reviews yet
                </h3>
                <p className="mb-4 text-gray-500">
                  Be the first to share your thoughts about this product
                </p>
                {userInfo ? (
                  <Button onClick={() => setShowReviewForm(true)}>
                    Write the First Review
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button>Sign in to Write Review</Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReview;
