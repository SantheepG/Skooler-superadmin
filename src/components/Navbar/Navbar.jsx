import React, { useState } from "react";

const Navbar = ({ toggle }) => {
  const [viewDropdown, setViewDropdown] = useState(false);
  return (
    <React.Fragment>
      <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 px-16">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={toggle}
              >
                <span class="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="https://flowbite.com" class="flex ms-2 md:me-24">
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Skooler
                </span>
              </a>
            </div>
            <div class="flex items-center">
              <div class="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                    onClick={() => setViewDropdown(!viewDropdown)}
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                {viewDropdown && (
                  <div
                    class="z-50 absolute my-4 mt-48 -ml-40 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div class="px-4 py-3" role="none">
                      <p
                        class="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        Neil Sims
                      </p>
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        neil.sims@dfdf.com
                      </p>
                    </div>
                    <ul class="py-1" role="none">
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Log out
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
};
export default Navbar;
