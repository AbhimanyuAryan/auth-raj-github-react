import React from "react";
import fb from "../assets/fb_signin.png";
import google from "../assets/google_signin.png";

const SocialLoginLinks = () => (
  <div>
    <p style={{ textAlign: "center" }}>- OR -</p>

    <div style={{ display: "flex" }}>
      <a
        href={`http://localhost:3000/auth/github?linkinguri=${
          window.location.origin
        }/socialauthredirect`}
      >
        <img src={fb} alt={"fblogo"} style={{ flexGrow: 1, width: "95%" }} />
      </a>
    </div>
  </div>
);

export default SocialLoginLinks;
