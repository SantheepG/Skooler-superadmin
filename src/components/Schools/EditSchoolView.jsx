import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import hologoLogo from "../assets/Hologo_logo.png";
import "react-datepicker/dist/react-datepicker.css";
import ColorPicker from "./ColorPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UpdateUI } from "../../api/SchoolAPI";
const EditSchoolView = ({ school, close }) => {
  const MAX_WIDTH = 200;
  const MAX_HEIGHT = 200;
  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState(hologoLogo);
  const [logoPreview, setLogoPreview] = useState(hologoLogo);

  const [ui, setUI] = useState([]);
  const [UIChange, setUIChange] = useState({
    primary_clr: "",
    secondary_clr: "",
  });
  const [admin, setAdmin] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [hour, setHour] = useState("");
  const [mins, setMins] = useState("");
  const [schoolDetails, setSchoolDetails] = useState();
  //hidden components
  const [editSubscription, setEditSubscription] = useState(false);
  const [editSchool, setEditSchool] = useState(false);
  const [editUI, setEditUI] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);

  useEffect(() => {
    setUI(JSON.parse(school.ui));
    setAdmin(JSON.parse(school.admin));
  }, [school]);
  const handleHourChange = (e) => {
    const inputHour = parseInt(e.target.value, 10);

    if (isNaN(inputHour) || inputHour < 0 || inputHour > 23) {
      console.log("Invalid time");
    } else {
      let formattedHour = inputHour.toString().padStart(2, "0");
      setHour(formattedHour);
    }
  };

  const handleMinChange = (e) => {
    const inputMin = parseInt(e.target.value, 10);

    if (isNaN(inputMin) || inputMin < 0 || inputMin > 59) {
      console.log("Invalid time");
    } else {
      let formattedMin = inputMin.toString().padStart(2, "0");
      setMins(formattedMin);
    }
  };

  const handleUpdateClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];

    setLogo(selectedFile);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = URL.createObjectURL(selectedFile);

    image.onload = () => {
      let width = image.width;
      let height = image.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          //const blobUrl = URL.createObjectURL(blob);

          setSchoolDetails((prevState) => ({
            ...prevState,
            logo: blob,
          }));
        },
        "image/jpeg",
        0.9
      );
    };

    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);

    console.log("Selected file:", selectedFile);
  };

  const updateUI = async () => {
    if (UIChange.primary_clr !== "" && UIChange.secondary_clr !== "") {
      const response = await UpdateUI({
        id: school.id,
        ui: JSON.stringify(UIChange),
      });
      if (response) {
        toast.success("Updated");
        setTimeout(() => {
          setUI(UIChange);
          setEditUI(false);
        }, 500);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };
  return (
    <React.Fragment>
      <div class="py-4 leading-6">
        <div class="mx-auto px-4 sm:px-6 lg:px-8">
          <ToastContainer />
          <nav>
            <ul class="flex m-0 items-center p-0">
              <li class="text-left">
                <a
                  href="#"
                  title=""
                  class="cursor-pointer text-gray-400 hover:text-gray-900"
                  onClick={close}
                >
                  <svg
                    class="block h-5 w-5 align-middle"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </a>
              </li>

              <li class="flex items-center text-left">
                <svg
                  class="block h-5 w-5 align-middle text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"></path>
                </svg>

                <a
                  href="#"
                  title=""
                  class="cursor-pointer text-sm font-normal leading-5 text-gray-600 hover:text-gray-900"
                >
                  {" "}
                  {school.name}
                </a>
              </li>
            </ul>
          </nav>

          <p class="mt-5 text-lg font-bold leading-7 text-gray-800">
            Edit school
          </p>
        </div>
        <div class="col-span-8 overflow-hidden rounded-xl sm:px-8 ">
          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold">Subscription</p>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p class="text-gray-600">
              Subscription expires on{" "}
              <strong>{school.subscription_expiry}</strong>
            </p>
            <button
              class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
              onClick={() => {
                setEditSubscription(!editSubscription);
                setEditSchool(false);
                setEditUI(false);
                setEditAdmin(false);
              }}
            >
              Change
            </button>
          </div>
          {editSubscription && (
            <div class="flex my-6 flex-col sm:flex-row sm:items-center sm:justify-between">
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
                      name="hour"
                      id="hour"
                      min={0}
                      max={23}
                      value={hour}
                      className="mr-1 w-16 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => handleHourChange(e)}
                    />
                    <div className="text-3xl"> : </div>
                    <input
                      type="number"
                      name="mins"
                      id="mins"
                      min={0}
                      max={59}
                      value={mins}
                      className="ml-1 w-16 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      onChange={(e) => handleMinChange(e)}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  class="text-white h-10 mt-7 ml-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </div>
            </div>
          )}
          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold">School details</p>
          <div className="text-sm ">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Name : <strong>{school.name}</strong>
              </p>
              <button
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                onClick={() => {
                  setEditSubscription(false);
                  setEditSchool(!editSchool);
                  setEditUI(false);
                  setEditAdmin(false);
                }}
              >
                Change
              </button>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Email : <strong>{school.email}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Phone : <strong>{school.phone}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Address : <strong>{school.address}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Country : <strong>{school.country}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Currency : <strong>{school.currency}</strong>
              </p>
            </div>
          </div>
          {editSchool && (
            <div className="w-2/3">
              <div className="lg:flex justify-center my-6">
                <div className="w-1/2 ">
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
                      value={school.name}
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
                      value={school.email}
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
                      value={school.address}
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
                        value={school.country}
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
                        value={school.currency}
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
                      value={school.id}
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
                      value={school.phone}
                    />
                  </div>

                  <div className="mt-10 flex">
                    <label class="relative inline-flex items-center cursor-pointer ml-6">
                      <input
                        id="delivery"
                        type="checkbox"
                        checked={school.delivery}
                        value={school.delivery}
                        class="sr-only peer"
                      />
                      <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Delivery
                      </span>
                    </label>
                    <label class="relative inline-flex items-center cursor-pointer ml-6">
                      <input
                        id="pickup"
                        type="checkbox"
                        checked={school.pickup}
                        value={school.pickup}
                        class="sr-only peer"
                      />
                      <div
                        className={`${
                          school.pickup ? "" : ""
                        } w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                      ></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        pick-up
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold">UI elements</p>
          <div>
            <div class="flex flex-col text-sm  sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Primary colour :{" "}
                <strong
                  className={`bg-${ui.primary_clr} w-6 h-3  rounded-full inline-block`}
                ></strong>{" "}
              </p>
              <button
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                onClick={() => {
                  setEditSubscription(false);
                  setEditSchool(false);
                  setEditUI(!editUI);
                  setEditAdmin(false);
                }}
              >
                Change
              </button>
            </div>
            <div class="flex flex-col text-sm  sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Seconday colour :{" "}
                <strong
                  className={`bg-${ui.secondary_clr} w-6 h-3  rounded-full inline-block`}
                ></strong>
              </p>
            </div>
          </div>
          {editUI && (
            <form action="#" className="w-2/3 my-8">
              <div className="flex justify-center ">
                <div className="w-1/2">
                  <div className="mb-6">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Primary colour
                      <span className="required text-red-500"> *</span>
                    </label>
                    <ColorPicker
                      key="primary"
                      updateClr={(e) =>
                        setUIChange({
                          ...UIChange,
                          primary_clr: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Secondary colour
                      <span className="required text-red-500"> *</span>
                    </label>
                    <ColorPicker
                      key="secondary"
                      updateClr={(e) =>
                        setUIChange({
                          ...UIChange,
                          secondary_clr: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="w-1/2 m-4 ">
                  <div className="flex">
                    <div className="flex sm:col-span-4 w-36 h-36">
                      <img
                        className="border rounded w-36 h-36"
                        src={logoPreview}
                        alt="School logo"
                      />
                      <div>
                        <button
                          className="ml-6 border my-16 px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-900"
                          onClick={handleUpdateClick}
                        >
                          Change
                        </button>
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </div>
                      <div>
                        <button
                          className="ml-6 border my-16 px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-900"
                          onClick={updateUI}
                        >
                          update
                        </button>
                        <input type="button" onChange={handleFileChange} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="">
                <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4"></div>
              </div>

              <div class="mb-4"></div>
              <div class="ml-56 items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
            </form>
          )}

          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold">Admin details</p>
          <div>
            <div class="flex flex-col text-sm  sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Name : <strong>{admin.first_name}</strong>{" "}
                <strong>{admin.last_name}</strong>
              </p>
              <button
                class="inline-flex text-sm font-semibold text-blue-600 underline decoration-2"
                onClick={() => {
                  setEditSubscription(false);
                  setEditSchool(false);
                  setEditUI(false);
                  setEditAdmin(!editAdmin);
                }}
              >
                Change
              </button>
            </div>
            <div class="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Phone : <strong>{admin.mobile_no}</strong>{" "}
              </p>
            </div>
            <div class="flex flex-col text-sm sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Email : <strong>{admin.email}</strong>
              </p>
            </div>
          </div>
          <hr class="mt-4 mb-8" />

          <div class="mb-10 text-sm ">
            <p class="py-2 text-xl font-semibold">Delete School</p>
            <p class="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              Proceed with caution
            </p>
            <p class="mt-2">
              Make sure you have taken backup of this school in case you ever
              need to get access to your data. This will completely wipe your
              data. There is no way to access your account after this action.
            </p>
            <button class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">
              Continue with deletion
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default EditSchoolView;
