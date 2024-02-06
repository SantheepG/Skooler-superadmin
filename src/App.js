import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login/Login";
import { useState } from "react";
function App() {
  const [loggedIn, setLoggedIn] = useState(true); //indicates the login status
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<Login loggedin={() => setLoggedIn(true)} />}
          ></Route>
          <Route path="/admin" element={<Main loggedIn={loggedIn} />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
