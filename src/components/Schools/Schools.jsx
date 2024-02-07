import React, { useState } from "react";
import SchoolCard from "./SchoolCard";
import AddSchoolView from "./AddSchoolView";

const Schools = () => {
  const [viewEdit, setViewedit] = useState(false);
  const [viewAdd, setViewAdd] = useState(false);
  return (
    <React.Fragment>
      <div className="p-4 sm:ml-64">
        <div
          className={`${
            viewAdd || viewEdit ? "opacity-40" : ""
          } p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14`}
        >
          <div className="flex mb-8 px-4 items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
            <label for="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              className="flex items-center justify-center text-white bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              onClick={() => {
                setViewAdd(!viewAdd);
              }}
            >
              Add
            </button>
          </div>
          <div className="grid gap-10 pb-20 sm:grid-cols-2 lg:grid-cols-3">
            <SchoolCard editClicked={() => setViewedit(true)} />
            <SchoolCard />
            <SchoolCard />
            <SchoolCard />
          </div>
        </div>

        {viewAdd && (
          <div
            id="addSchoolModal"
            tabindex="-1"
            aria-hidden="true"
            className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}
          >
            <AddSchoolView closeModal={() => setViewAdd(false)} />
          </div>
        )}
        {viewEdit && (
          <div
            id="editSchoolModal"
            tabindex="-1"
            aria-hidden="true"
            className={`flex fixed top-0 left-0 right-0 z-50 items-center justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full `}
          >
            <SchoolCard />
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
export default Schools;
