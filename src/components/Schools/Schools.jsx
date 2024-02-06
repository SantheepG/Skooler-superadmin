import React from "react";

const Schools = () => {
  return (
    <React.Fragment>
      <div class="p-4 sm:ml-64">
        <div class="p-4  border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div class="flex mb-8 px-8 items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            <label for="table-search" class="sr-only">
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search-users"
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
            </div>
            <button
              type="button"
              id="createProductButton"
              data-modal-toggle="createProductModal"
              class="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
            >
              Add
            </button>
          </div>
          <div class="grid gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            <div class="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
              <div class="flex items-center">
                <h5 class="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
                  Fatima college, National school
                </h5>
                <span class="ml-4 text-sm text-gray-500 border px-4 py-1 rounded-2xl hover:text-gray-700 cursor-pointer">
                  edit
                </span>
              </div>

              <div class="my-4 flex items-center">
                <div className=" w-36 h-36">
                  <img
                    class="rounded w-36 h-36"
                    src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1707224400&semt=ais"
                    alt="Extra large avatar"
                  />
                </div>
                <div className="px-2">dssdsd</div>
              </div>
              <div class="">
                <span class="text-gray-500 text-sm">Subscription</span>
                <span class="float-right text-sm text-gray-400">
                  expire on 2024-03-03
                </span>
                <div class="h-2 overflow-hidden rounded-full bg-gray-300">
                  <div class="h-full w-8/12 bg-blue-500"></div>
                </div>
                <p class="text-sm text-blue-500">20 days remaining</p>
              </div>
            </div>
            <div class="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
              <div class="flex items-center">
                <h5 class="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
                  Fatima college, National school
                </h5>
                <span class="ml-4 text-sm text-gray-500 border px-4 py-1 rounded-2xl hover:text-gray-700 cursor-pointer">
                  edit
                </span>
              </div>

              <div class="my-4 flex items-center">
                <div className=" w-36 h-36">
                  <img
                    class="rounded w-36 h-36"
                    src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1707224400&semt=ais"
                    alt="Extra large avatar"
                  />
                </div>
                <div className="px-2">dssdsd</div>
              </div>
              <div class="">
                <span class="text-gray-500 text-sm">Subscription</span>
                <span class="float-right text-sm text-gray-400">
                  expire on 2024-03-03
                </span>
                <div class="h-2 overflow-hidden rounded-full bg-gray-300">
                  <div class="h-full w-8/12 bg-blue-500"></div>
                </div>
                <p class="text-sm text-blue-500">20 days remaining</p>
              </div>
            </div>
            <div class="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
              <div class="flex items-center">
                <h5 class="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
                  Fatima college, National school
                </h5>
                <span class="ml-4 text-sm text-gray-500 border px-4 py-1 rounded-2xl hover:text-gray-700 cursor-pointer">
                  edit
                </span>
              </div>

              <div class="my-4 flex items-center">
                <div className=" w-36 h-36">
                  <img
                    class="rounded w-36 h-36"
                    src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1707224400&semt=ais"
                    alt="Extra large avatar"
                  />
                </div>
                <div className="px-2">dssdsd</div>
              </div>
              <div class="">
                <span class="text-gray-500 text-sm">Subscription</span>
                <span class="float-right text-sm text-gray-400">
                  expire on 2024-03-03
                </span>
                <div class="h-2 overflow-hidden rounded-full bg-gray-300">
                  <div class="h-full w-8/12 bg-blue-500"></div>
                </div>
                <p class="text-sm text-blue-500">20 days remaining</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Schools;
