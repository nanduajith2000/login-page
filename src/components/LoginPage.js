import LoginForm from "./LoginForm.js";
import Navbar from "./Navbar.js";
import React, { useState } from "react";
import PhotoCarousel from "./PhotoCarousel.js";
import "./LoginPage.css";

export const userDetailsContext = React.createContext();

function LoginPage() {
  const [webAccount, setWebAccount] = useState("");
  const [password, setPassword] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  return (
    <div className="container">
      <Navbar />
      <div className="login">
        <userDetailsContext.Provider
          value={{
            webAccount,
            setWebAccount,
            password,
            setPassword,
            conferenceId,
            setConferenceId,
          }}
        >
          <LoginForm className="login-form" />
        </userDetailsContext.Provider>
        <PhotoCarousel className="carousel" />
      </div>
      <div className="footer-text">Copyright © Bsnl. 2008-2013.</div>
    </div>
  );
}

export default LoginPage;
