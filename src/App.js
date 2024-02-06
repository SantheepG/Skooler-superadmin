import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";

function App() {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="App">
      <Navbar toggle={() => setToggle(!toggle)} />
      <Sidebar toggle={toggle} />
      <Main />
    </div>
  );
}

export default App;
