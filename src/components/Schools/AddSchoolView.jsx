import React, { useState, useEffect, useRef } from "react";
import hologoLogo from "../assets/Hologo_logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ColorPicker from "./ColorPicker";

const AddSchoolView = ({ closeModal, reload }) => {
  const [logo, setLogo] = useState(hologoLogo);
  const [nextClicked, setNextClicked] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");

  const fileInputRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    console.log("Selected file:", selectedFile);
  };
  const [hours, setHours] = useState({
    hour1: "",
    hour2: "",
  });

  const [mins, setMins] = useState({
    mins1: "",
    mins2: "",
  });

  useEffect(() => {
    const formattedDate = (date) => {
      if (!date || isNaN(date.getTime())) {
        return "";
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      //setSelectedDate(`${year}-${month}-${day}`);
      return `${year}-${month}-${day}`;
    };

    setSelectedDateStr(formattedDate(selectedDate));
  }, [selectedDate]);

  return (
    <React.Fragment>
      <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 ">
          <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Add School
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="createProductModal"
              onClick={() => {
                closeModal();
                setNextClicked(false);
              }}
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="currentColor"
                viewbox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>

          <div className="overflow-y-auto p-2 overflow-x-auto ">
            {nextClicked ? (
              <form action="#">
                <div className="flex justify-center">
                  <div className="w-1/2">
                    <div className="mb-6">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Primary colour
                        <span className="required text-red-500"> *</span>
                      </label>
                      <ColorPicker key="primary" />
                    </div>
                    <div className="mb-5">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Secondary colour
                        <span className="required text-red-500"> *</span>
                      </label>
                      <ColorPicker key="secondary" />
                    </div>
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="mb-2 flex">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Country
                          <span className="required text-red-500"> *</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          required=""
                        />
                      </div>
                      <div className="w-1/3 mx-4">
                        <label
                          for="name"
                          class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Currency
                          <span className="required text-red-500"> *</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          required=""
                        />
                      </div>
                    </div>
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone number
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                  </div>
                  <div className="w-1/2 m-4 ">
                    <div className="flex">
                      <div className="flex sm:col-span-4 w-36 h-36">
                        <img
                          className="border rounded w-36 h-36"
                          src={logo}
                          alt="School logo"
                        />
                        <div>
                          <button
                            className="ml-6 border my-16 px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-900"
                            onClick={handleButtonClick}
                          >
                            update
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-6">
                      <div className="">
                        <label
                          for="weight"
                          class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Subscription expiry{" "}
                          <span className="required text-red-500"> *</span>
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          className="w-44 rounded border border-gray-300 "
                          onChange={(date) => {
                            setSelectedDate(date);
                          }}
                        />
                      </div>
                      <div className="ml-2 mb-2">
                        <label
                          for="length"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Time<span className="required text-red-500"> *</span>
                        </label>
                        <div className="flex w-full">
                          <input
                            type="number"
                            name="hour1"
                            id="hour1"
                            min={0}
                            max={23}
                            value={hours.hour1}
                            className="mr-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                          <div className="text-3xl"> : </div>
                          <input
                            type="number"
                            name="mins1"
                            id="mins1"
                            min={0}
                            max={59}
                            value={mins.mins1}
                            class="ml-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4"></div>
                </div>

                <div class="mb-4"></div>
                <div class="ml-56 items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <button
                    data-modal-toggle="createProductModal"
                    type="button"
                    class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      setNextClicked(false);
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add
                  </button>
                </div>
              </form>
            ) : (
              <form action="#">
                <div className="flex justify-center mb-6">
                  <div className="w-1/2">
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        School name{" "}
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="email"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="mb-2 flex">
                      <div>
                        <label
                          for="name"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Country
                          <span className="required text-red-500"> *</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          required=""
                        />
                      </div>
                      <div className="w-1/3 mx-4">
                        <label
                          for="name"
                          class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Currency
                          <span className="required text-red-500"> *</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          required=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 mx-2 ">
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        School ID
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        for="name"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone number
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                      />
                    </div>
                    <div className="flex">
                      <div className="">
                        <label
                          for="weight"
                          class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Subscription expiry{" "}
                          <span className="required text-red-500"> *</span>
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          className="w-44 rounded border border-gray-300 "
                          onChange={(date) => {
                            setSelectedDate(date);
                          }}
                        />
                      </div>
                      <div className="ml-2 mb-2">
                        <label
                          for="length"
                          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Time<span className="required text-red-500"> *</span>
                        </label>
                        <div className="flex w-full">
                          <input
                            type="number"
                            name="hour1"
                            id="hour1"
                            min={0}
                            max={23}
                            value={hours.hour1}
                            className="mr-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                          <div className="text-3xl"> : </div>
                          <input
                            type="number"
                            name="mins1"
                            id="mins1"
                            min={0}
                            max={59}
                            value={mins.mins1}
                            class="ml-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4"></div>
                </div>

                <div class="mb-4"></div>
                <div class="ml-56 items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                  <button
                    data-modal-toggle="createProductModal"
                    type="button"
                    class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={() => {
                      closeModal();
                      setNextClicked(false);
                    }}
                  >
                    <svg
                      class="mr-1 -ml-1 w-5 h-5"
                      fill="currentColor"
                      viewbox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Cancel
                  </button>
                  <button
                    type="button"
                    class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={() => setNextClicked(true)}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddSchoolView;
