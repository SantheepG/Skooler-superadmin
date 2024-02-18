import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/admin" element={<Main />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
