import React from "react";

const Nav = () => {
  return (
    <React.Fragment>
      <nav class="bt-white shadow-lg">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-center">
            <a
              href="#"
              class=" text-gray-900 rounded-md px-3 py-2 text-2xl border rounded-xl font-medium"
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
