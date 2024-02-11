import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Schools from "./Schools/Schools";
import { FetchSchools } from "../api/SchoolAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Main = ({ loggedIn }) => {
  const [schools, setSchools] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const state = useSelector((state) => state);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    } else {
      const fetchData = async () => {
        let response = await FetchSchools();
        if (response) {
          setSchools(response.data.data);
          setReload(false);
        } else {
          console.error("error occured when fetching data");
        }
      };

      fetchData();
    }
  }, [reload]);

  let componentToRender;
  if (state.dashboardClicked) {
    componentToRender = <Dashboard />;
  } else {
    componentToRender = (
      <Schools schools={schools} reload={() => setReload(true)} />
    );
  }
  return (
    <React.Fragment>
      {loggedIn && (
        <div className="App">
          <Navbar toggle={() => setToggle(!toggle)} />
          <Sidebar toggle={toggle} schoolCount={schools.length} />
          {componentToRender}
        </div>
      )}
    </React.Fragment>
  );
};
export default Main;
