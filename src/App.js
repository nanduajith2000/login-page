import "./App.css";
import React, { useState } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const userDetailsContext = React.createContext();

function App() {
  const [webAccount, setWebAccount] = useState("");
  return (
    <BrowserRouter>
      <userDetailsContext.Provider value={{ webAccount, setWebAccount }}>
        <div className="App">
          <Routes>
            <Route path="*" element={<LoginPage />}></Route>
            <Route path="/home/*" element={<Home />}></Route>
          </Routes>
        </div>
      </userDetailsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
