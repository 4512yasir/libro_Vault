import React from "react";
import '../../css/footer.css'
import emailLogo from "../../assets/email-1-svgrepo-com.svg";
import githubLogo from "../../assets/github-142-svgrepo-com.svg";
import instagramLogo from "../../assets/instagram-svgrepo-com.svg";
import copyrightLogo from "../../assets/copyright-svgrepo-com.svg";

function SocialMediaIcons({ gitAccount, instagram, email }) {
    return (
      <>
        <div className="SocialsContainer">
          <div>
            <a href="#" target="_blank" rel="noreferrer">
              <img src={githubLogo} alt="gitLogo" />
              </a>
          </div>
          <div>
            <a href="#">
              <img src={instagramLogo} alt="instagramLogo" target="_blank" rel="noreferrer" />
              </a>
          </div>
          <div>
            <a href="#" target="_blank" rel="noreferrer">
              <img src={emailLogo} alt="emailLogo" />
              </a>
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
              src="/logo.png"
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
