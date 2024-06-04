import React from "react";
import AdCard from "../cards/AdCard";
import AdAllButton from "../buttons/AdAllButton";

const AdContainer = ({ title, target }) => {
  return (
    <div className="border w-5/6 m-auto bg-light-grey pb-7 mb-20">
      <div className="flex justify-between items-center pt-3 pb-3">
        <h1 className="text-3xl ps-5">
          {title} <span className="text-button-blue">Anzeigen</span>
        </h1>

        <div className="me-24">
          <AdAllButton target={target} />
        </div>
      </div>

      <div>
        <AdCard />
      </div>
    </div>
  );
};

export default AdContainer;
