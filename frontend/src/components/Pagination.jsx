import { Link, useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { useMemo, useState, useEffect } from "react";

const Pagination = ({ pages, pageNum, isAdmin = false, keyword = "" }) => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 570);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPagePath = useMemo(() => {
    return (pageNumber) => {
      if (isAdmin) {
        if (location.pathname.includes("/admin/orders")) {
          return `/admin/orders/page/${pageNumber}`;
        }
        if (location.pathname.includes("/admin/products")) {
          return `/admin/products/page/${pageNumber}`;
        }
        return `/admin/products/page/${pageNumber}`;
      }
      if (keyword) {
        return `/search/${keyword}/page/${pageNumber}`;
      }
      return `/page/${pageNumber}`;
    };
  }, [isAdmin, location.pathname, keyword]);

  const pageNumbers = useMemo(() => {
    const delta = isMobile ? 1 : 2;
    const range = [];
    const rangeWithDots = [];

    range.push(1);

    for (
      let i = Math.max(2, pageNum - delta);
      i <= Math.min(pages - 1, pageNum + delta);
      i++
    ) {
      range.push(i);
    }

    if (pages > 1) {
      range.push(pages);
    }

    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    let prev = 0;
    for (const page of uniqueRange) {
      if (page - prev > 1) {
        rangeWithDots.push("...");
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  }, [pages, pageNum, isMobile]);

  if (pages <= 1) return null;

  const isFirstPage = pageNum === 1;
  const isLastPage = pageNum === pages;

  return (
    <nav
      className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0"
      role="navigation"
      aria-label="Pagination"
    >
      <div className="flex items-center justify-center space-x-0.5 sm:space-x-1">
        {!isFirstPage && (
          <Link
            to={getPagePath(pageNum - 1)}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-secondary transition-colors hover:bg-gray-100 sm:h-8 sm:w-8"
            aria-label="Go to previous page"
          >
            <FaChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        )}

        {pageNumbers.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-7 w-7 items-center justify-center text-gray-400 sm:h-8 sm:w-8"
                aria-hidden="true"
              >
                <FiMoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
            );
          }

          const isCurrentPage = pageNum === page;

          return (
            <Link
              key={page}
              to={getPagePath(page)}
              className={`flex h-7 w-7 items-center justify-center rounded-md border text-xs transition-colors sm:h-8 sm:w-8 sm:text-sm ${
                isCurrentPage
                  ? "border-secondary bg-secondary text-white"
                  : "border-gray-300 text-secondary hover:bg-gray-100"
              }`}
              aria-current={isCurrentPage ? "page" : undefined}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </Link>
          );
        })}

        {!isLastPage && (
          <Link
            to={getPagePath(pageNum + 1)}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300 text-secondary transition-colors hover:bg-gray-100 sm:h-8 sm:w-8"
            aria-label="Go to next page"
          >
            <FaChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </Link>
        )}
      </div>

      <div className="text-xs text-gray-600 sm:text-sm" aria-live="polite">
        Page {pageNum} of {pages}
      </div>
    </nav>
  );
};

export default Pagination;
