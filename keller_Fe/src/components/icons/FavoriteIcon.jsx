import React from "react";
import { useNavigate } from "react-router-dom";

const FavoriteIcon = ({ count }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/wishlist");
  };

  return (
    <button
      className="relative hover:shadow-lg active:translate-y-1 rounded-full p-1"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
        />
      </svg>

      {count > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-button-blue rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export default FavoriteIcon;
