import React from "react";

const Nav = () => {
  return (
    <React.Fragment>
      <nav className="bt-white shadow-lg">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-center">
            <a
              href="#"
              className=" text-gray-900 rounded-md px-3 py-2 text-2xl border rounded-xl font-medium"
              aria-current="page"
            >
              Skooler
            </a>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
