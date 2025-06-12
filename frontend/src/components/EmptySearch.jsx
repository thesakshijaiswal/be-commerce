import { useNavigate } from "react-router-dom";
import Button from "./Button";
import emptySearchSVG from "../assets/empty-search.svg";
import { FaLocationArrow } from "react-icons/fa6";

const EmptySearch = ({ searchTerm }) => {
  const navigate = useNavigate();
  const handleExploreCollection = () => {
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 text-center">
      <img
        src={emptySearchSVG}
        className="h-60 w-full md:h-96"
        alt="No results found"
      />
      <h3 className="text-2xl font-bold text-secondary">No Results Found</h3>
      <p className="w-11/12 text-gray-500 md:w-full">
        {searchTerm
          ? `We couldn't find any matches for "${searchTerm}". Please try a different search.`
          : "Please try searching for something else or explore our collection."}
      </p>
      <Button
        className="z-20 whitespace-nowrap"
        onClick={handleExploreCollection}
      >
        Explore our Collection
        <FaLocationArrow />
      </Button>
    </div>
  );
};

export default EmptySearch;
