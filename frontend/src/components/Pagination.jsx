import { Link, useLocation } from "react-router-dom";

const Pagination = ({ pages, pageNum, isAdmin = false, keyword = "" }) => {
  const location = useLocation();
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  const getPagePath = (pageNumber) => {
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

  return pages > 1 ? (
    <div className="flex space-x-2">
      {pageNumbers?.map((pageNumber) => (
        <Link
          to={getPagePath(pageNumber)}
          key={pageNumber}
          className={`rounded-md border px-3 py-2 ${
            pageNum === pageNumber
              ? "bg-secondary text-white"
              : "border-gray-300 text-secondary hover:bg-gray-100"
          }`}
        >
          {pageNumber}
        </Link>
      ))}
    </div>
  ) : null;
};

export default Pagination;
