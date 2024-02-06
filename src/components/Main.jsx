import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Schools from "./Schools/Schools";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Main = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const state = useSelector((state) => state);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, []);

  let componentToRender;
  if (state.dashboardClicked) {
    componentToRender = <Dashboard />;
  } else {
    componentToRender = <Schools />;
  }
  return (
    <React.Fragment>
      {loggedIn && (
        <div className="App">
          <Navbar toggle={() => setToggle(!toggle)} />
          <Sidebar toggle={toggle} />
          {componentToRender}
        </div>
      )}
    </React.Fragment>
  );
};
export default Main;
