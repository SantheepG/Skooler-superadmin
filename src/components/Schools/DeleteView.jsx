import React from "react";
const DeleteView = ({ cancel, deleteSchool }) => {
  return (
    <React.Fragment>
      <div className="">
        <div
          id="deleteModal"
          tabindex="-1"
          aria-hidden="true"
          class="relative ViewContent overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative w-full max-w-md max-h-full">
            <div class="relative text-center bg-white rounded-lg  dark:bg-gray-800 sm:p-5">
              <p class="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete?
              </p>
              <div class="flex justify-center items-center space-x-4">
                <button
                  data-modal-toggle="deleteModal"
                  type="button"
                  class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={cancel}
                >
                  No, cancel
                </button>
                <button
                  type="submit"
                  class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  onClick={deleteSchool}
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DeleteView;
