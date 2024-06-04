import React from "react";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileContainer from "../components/container/ProfileContainer";
import Banner from "../components/Banner";

const Profile = () => {
  const title = `PROFILE`;

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
          <ProfileContainer />
        </div>
      </div>
    </>
  );
};

export default Profile;
