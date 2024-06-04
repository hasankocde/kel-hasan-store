import React from "react";
import { useNavigate } from "react-router-dom";

const NewAdFormButton = () => {
 

  return (
    <div>
      <button
        type="submit"
        className="btn bg-button-blue border border-0.5 border-button-blue hover:border-button-orange"
      >
        Anzeige Aufgeben
      </button>
    </div>
  );
};

export default NewAdFormButton;
