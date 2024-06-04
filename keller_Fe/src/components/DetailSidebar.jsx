import React from "react";
import { useNavigate } from "react-router-dom";

// Buttons Infos
const DetailButtons = [
  { name: "Nachricht", path: "/message" },
  { name: "Merkliste", path: "/wishlist" },
  { name: "Folgen", path: "#" },
];

const DetailSidebar = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <nav className="bg-background-filter-light-blue space-y-3 sm:w-80 py-5 ms-3 my-3 me-2 mt-10 rounded-lg">
<div className=" text-center text-white  ">
  <h1>Lukas Müller</h1>
  <h4>Aktif zeit 02,2019</h4>
  <h4>Privater Nutzer</h4>
</div>
        {DetailButtons.map((x) => {
          return (
            <div className="text-center" key={x.name}>
              <button
                onClick={() => handleClick(x.path)}
                className="btnProfile mt-3 w-56"
              >
                {x.name}
              </button>
            </div>
          );
        })}
      </nav>
    </>
  );
};

export default DetailSidebar;
