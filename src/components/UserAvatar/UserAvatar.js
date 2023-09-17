import React from "react";
import { getInitials } from "../../utils/misc";

const UserAvatar = ({ profilePhotoUrl, name, width }) => {
    const nameInitial = getInitials(name);
  return (
    <>
      {!profilePhotoUrl || profilePhotoUrl === "" ? (
        <div
        style={{
          width,
          height: width,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
          fontSize: `${width/4}px`,
          color: "white"
        }}
      >
        <p>
          {nameInitial}
        </p>
      </div>
      ) : (
        <div
        style={{
          width,
          height: width,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "gray",
          fontSize: `${width/4}px`,
          color: "white"
        }}
      >
        <img
          src={profilePhotoUrl}
          style={{
            width: width,
            height: width,
            borderRadius: "50%",
          }}
          alt="avatar"
        />
      </div>
      )}
    </>
  );
};

export default UserAvatar;
