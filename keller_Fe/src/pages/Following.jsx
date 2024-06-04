import React from "react";

import ProfileSidebar from "../components/ProfileSidebar";
import FollowingContainer from "../components/container/FollowingContainer";
import Banner from "../components/Banner";

const Following = () => {
  const title = `FOLGEN`;

  return (
    <>
      <div>
        <Banner title={title} target={"/allad"} />
      </div>
      <div className="flex">
        <div>
          <ProfileSidebar />
        </div>

        <div className="flex-grow">
          <FollowingContainer />
        </div>
      </div>
    </>
  );
};

export default Following;
