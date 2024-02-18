import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";
import Schools from "./Schools/Schools";
import { FetchSchools } from "../api/SchoolAPI";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Main = ({ logout }) => {
  const [schools, setSchools] = useState([]);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const state = useSelector((state) => state);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = localStorage.getItem("email");
      console.log(data);
      if (!data) {
        navigate("/");
      } else {
        setEmail(data);
        let response = await FetchSchools();
        if (response.status === 200) {
          setSchools(response.data.schools);
          setReload(false);
        } else {
          console.error("error occurred when fetching data");
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {email !== "" && (
        <div className="App">
          <Navbar toggle={() => setToggle(!toggle)} email={email} />
          <Sidebar toggle={toggle} schoolCount={schools.length} />
          {componentToRender}
        </div>
      )}
    </React.Fragment>
  );
};
export default Main;
