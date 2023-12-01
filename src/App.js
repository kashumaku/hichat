import { BrowserRouter, Route, Routes } from "react-router-dom";
import { chatContext, toggleContext } from "./context";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

function App() {
  const [userId, setUserId] = useState({})
  const [toggleMenu, setToggleMenu] = useState(false)
  const [toggleMessage, setToggleMessage] = useState(false)
  const [toggleFeeds, setToggleFeeds] = useState(true)
  const [toggleTheme, setToggleTheme] = useState(false)
  return (
    <BrowserRouter>
      <toggleContext.Provider value={{ toggleFeeds, setToggleFeeds, toggleMessage, setToggleMessage, toggleMenu, setToggleMenu, toggleTheme, setToggleTheme }}>
        <chatContext.Provider value={{ userId, setUserId }}>
          <Routes>
            <Route path="/chat-app-with-firebase" element={<Home />} />
            <Route path="/chat-app-with-firebase/login" element={<Login />} />
            <Route path="/chat-app-with-firebase/create" element={<CreateAccount />} />
          </Routes>

        </chatContext.Provider>
      </toggleContext.Provider>
    </BrowserRouter>
  );
}

export default App;
