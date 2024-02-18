import React from "react";
import HologoLogo from "../assets/Hologo_logo.png";

const Nav = () => {
  return (
    <React.Fragment>
      <nav className="bt-white shadow-lg">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-center">
            <div className="w-16 h-16">
              <img src={HologoLogo} alt="hologo logo" />
            </div>
            <a
              href="#"
              className="flex text-gray-900 rounded-md px-3 py-2 text-2xl border rounded-xl font-medium"
              aria-current="page"
            >
              <div className="flex">
                <div>Skooler</div>
              </div>{" "}
            </a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
