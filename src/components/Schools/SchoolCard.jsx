import React from "react";

const SchoolCard = ({ editClicked }) => {
  return (
    <React.Fragment>
      <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center">
          <h5 className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
            Fatima college, National school
          </h5>
          <span
            className="ml-4 text-sm text-gray-500 border px-4 py-1 rounded-2xl hover:text-gray-700 cursor-pointer"
            onClick={editClicked}
          >
            edit
          </span>
        </div>

        <div className="my-4 flex items-center">
          <div className=" w-36 h-36">
            <img
              class="rounded w-36 h-36"
              src="https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1448711260.1707224400&semt=ais"
              alt="Extra large avatar"
            />
          </div>
          <div className="px-2">dssdsd</div>
        </div>
        <div className="">
          <span className="text-gray-500 text-sm">Subscription</span>
          <span className="float-right text-sm text-gray-400">
            expire on 2024-03-03
          </span>
          <div className="h-2 overflow-hidden rounded-full bg-gray-300">
            <div className="h-full w-8/12 bg-blue-500"></div>
          </div>
          <p className="text-sm text-blue-500">20 days remaining</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SchoolCard;
