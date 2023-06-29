import LoginForm from "../components/LoginForm.js";
import Navbar from "../components/Navbar.js";
import React, { useState, useContext } from "react";
import PhotoCarousel from "../components/PhotoCarousel.js";
import { userDetailsContext } from "../App.js";
import "./LoginPage.css";
import { Route, Routes } from "react-router-dom";
import About from "../components/About.js";
import Download from "../components/Download.js";

export const userDetailsContextTwo = React.createContext();

function LoginPage() {
  const [password, setPassword] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  const webAccount = useContext(userDetailsContext).webAccount;
  const setWebAccount = useContext(userDetailsContext).setWebAccount;

  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div className="login">
              <userDetailsContextTwo.Provider
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
              </userDetailsContextTwo.Provider>
              <PhotoCarousel className="carousel" />
            </div>
          }
        />

        <Route path="/about" element={<About />} />
        <Route path="/download" element={<Download />} />
      </Routes>
      <div className="footer-text">Copyright © Bsnl. 2008-2013.</div>
    </div>
  );
}

export default LoginPage;
