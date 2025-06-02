import { Link } from "react-router-dom";

const Pagination = ({ pages, pageNum, keyword = "" }) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);
  return pages > 1 ? (
    <ul className="flex space-x-2">
      {pageNumbers?.map((pageNumber) => (
        <Link
          to={
            keyword
              ? `/search/${keyword}/page/${pageNumber}`
              : `/page/${pageNumber}`
          }
          key={pageNumber}
          className={`rounded-md border px-3 py-2 ${pageNum === pageNumber? "bg-secondary text-white" : "border-gray-300 text-secondary hover:bg-gray-100"}`}
        >
          {pageNumber}
        </Link>
      ))}
    </ul>
  ) : null;
};

export default Pagination;
