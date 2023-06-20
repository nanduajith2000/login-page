import LoginForm from "../components/LoginForm.js";
import Navbar from "../components/Navbar.js";
import React, { useState } from "react";
import PhotoCarousel from "../components/PhotoCarousel.js";
import "./LoginPage.css";
import { Routes, Route } from "react-router-dom";
import About from "../components/About.js";
import Download from "../components/Download.js";

export const userDetailsContext = React.createContext();

function LoginPage() {
  const [webAccount, setWebAccount] = useState("");
  const [password, setPassword] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        ></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="download" element={<Download />}></Route>
      </Routes>
      <div className="footer-text">Copyright © Bsnl. 2008-2013.</div>
    </div>
  );
}

export default LoginPage;
