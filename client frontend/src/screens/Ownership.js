import React from "react";
import Header from "../components/Header";
import MainOwnerShip from "../components/Ownerships/MainOwnerShip";

const ProfileScreen = () => {
  window.scrollTo(0, 0);
  // fileSelectedHandler = event => {
  //   console.log(event);
  // }

  return (
    <>
      <Header />
      <div className="main-wrap">
        <MainOwnerShip />
      </div>
    </>
  );
};

export default ProfileScreen;
