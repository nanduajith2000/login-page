import LoginForm from "./LoginForm.js";
import Navbar from "./Navbar.js";
import React, { useState } from "react";
import PhotoCarousel from "./PhotoCarousel.js";
import "./LoginPage.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./About.js";

export const userDetailsContext = React.createContext();

function LoginPage() {
  const [webAccount, setWebAccount] = useState("");
  const [password, setPassword] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  return (
    <BrowserRouter>
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
        </Routes>
        <div className="footer-text">Copyright © Bsnl. 2008-2013.</div>
      </div>
    </BrowserRouter>
  );
}

export default LoginPage;
