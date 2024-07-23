import LoginForm from "../components/LoginForm.js";
import Navbar from "../components/Navbar.js";
import React, { useState, useContext, useEffect } from "react";
import PhotoCarousel from "../components/PhotoCarousel.js";
import { userDetailsContext } from "../App.js";
import "./LoginPage.css";
import { Route, Routes, useLocation } from "react-router-dom";
import About from "../components/About.js";
import Download from "../components/Download.js";

export const userDetailsContextTwo = React.createContext();

function LoginPage() {
  const [password, setPassword] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  const webAccount = useContext(userDetailsContext).webAccount;
  const setWebAccount = useContext(userDetailsContext).setWebAccount;
  const location = useLocation();
  const [apiSuccess, setApiSuccess] = useState(false);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  // Simulate the API response (Replace this with your actual API call)
  const checkApiSuccess = () => {
    // Assuming the API response is stored in a variable called "apiResponse"
    const apiResponse = "Success"; // Replace this with the actual API response value
    setApiSuccess(apiResponse === "Success");
  };

  useEffect(() => {
    // Call the API check function when the component mounts
    checkApiSuccess();
  }, []);

  return (
    <div className="container">
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`login ${
                location.pathname === "/" ? "slide-in active" : "slide-in"
              }`}
            >
              {apiSuccess ? (
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
              ) : (
                <div className="login-error">
                  Oops! Something went wrong with the API. Please try again later.
                </div>
              )}
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
