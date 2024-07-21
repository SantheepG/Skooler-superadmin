import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login/Login";
export const imgFormats = ["jpg", "jpeg", "png", "bmp", "wbmp"]; //img formats
export const base_URL = "http://127.0.0.1:8001/api";
export const s3base_URL = "https://skooler-app.s3.amazonaws.com/";
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
