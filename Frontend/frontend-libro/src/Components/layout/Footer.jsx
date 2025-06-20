import React from "react";
import '../Css/Footer.css'
import emailLogo from "../assets/email-1-svgrepo-com.svg";
import githubLogo from "../assets/github-142-svgrepo-com.svg";
import instagramLogo from "../assets/instagram-svgrepo-com.svg";
import copyrightLogo from "../assets/copyright-svgrepo-com.svg";

function SocialMediaIcons({ gitAccount, instagram, email }) {
    return (
      <>
        <div className="SocialsContainer">
          <div>
            <img src={githubLogo} alt="gitLogo" />
          </div>
          <div>
            <img src={instagramLogo} alt="instagramLogo" />
          </div>
          <div>
            <img src={emailLogo} alt="emailLogo" />
          </div>
        </div>
      </>
    );
}

function CopyRight() {
  return (
    <>
      <div>
        <div className="logoDiv">
          <div className="logoImageDiv">
            <img
              className="logoImage"
              src="/heart-solid.svg"
              alt="logo"
            />
          </div>
          <div>
            <img
              className="copyrightImage"
              src={copyrightLogo}
              alt="copyrightLogo"
            />
          </div>
          <div className="logoNameDiv">
            <p className="logoNamePara">
              Copyright 
              <br />
              @2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Footer(){
    return (
      <footer className="footer">
        <CopyRight />
        <SocialMediaIcons gitAccount={""} instagram={""} email={""}/>
      </footer>
    );
}
