import "./App.css";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import PhotoCarousel from "./components/PhotoCarousel";

export const userDetailsContext = React.createContext();

function App() {
  const [webAccount, setWebAccount] = useState("");
  const [password, setPassword] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  return (
    <div className="App">
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
          <LoginForm />
        </userDetailsContext.Provider>
        <PhotoCarousel />
      </div>
    </div>
  );
}

export default App;
