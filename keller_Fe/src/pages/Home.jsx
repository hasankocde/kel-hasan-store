import React from "react";
import Banner from "../components/Banner";
import CategoryIconCard from "../components/cards/CategoryIconCard";
import AdContainer from "../components/container/AdContainer";

const Home = () => {
  const title = `Von hier aus konnen Sie alles #Kaufen, #mieten, #buchen.`;
  const desc = ` Kaufen und verkaufen Sie alles, von Gebrauchtwagen bis hin zu Mobiltelefonen und Computern, oder suchen Sie weltweit nach Immobilien, Jobs und mehr`;
 

  return (
    <div className=" ">
      <div className=" ">
        <Banner title={title} desc={desc} target={"/allad"} />
        <div>
          <CategoryIconCard />
        </div>
      </div>
      <div className="flex ">
        {/* /* -------------------------------------------------------------------------- */}
        <div className="flex-grow ">
          {/* /* -------------------------------------------------------------------------- */}

          <AdContainer title={"Neueste"} target={"/allad"} />

          <AdContainer title={"Beliebte"} target={"/allad?category=belibte"} />

          <AdContainer title={"Most View"} target={"/allad"} />

          {/* /! -------------------------------------------------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Home;
