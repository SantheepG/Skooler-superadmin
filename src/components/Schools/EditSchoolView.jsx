import React, { useEffect, useState, useRef } from "react";
import DatePicker from "react-datepicker";
import hologoLogo from "../assets/Hologo_logo.png";
import "react-datepicker/dist/react-datepicker.css";
import ColorPicker from "./ColorPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Countries } from "../../api/Countries";
import { s3base_URL } from "../../App";
import {
  UpdateExpiry,
  UpdateUI,
  UpdateInfo,
  UpdateAdmin,
  DeleteSchool,
  UpdateStatus,
  UpdateLogo,
} from "../../api/SchoolAPI";
import DeleteView from "./DeleteView";
const EditSchoolView = ({ school, close, reload }) => {
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [countriesToView, setCountriesToView] = useState([]);
  const [viewCountryDropdown, setViewCountryDropdown] = useState(false);

  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState(null);

  const [logoPreview, setLogoPreview] = useState(hologoLogo);
  const [expiry, setExpiry] = useState("");
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
  const [schoolDetails, setSchoolDetails] = useState("");
  const [status, setStatus] = useState(true);
  //hidden components
  const [editSubscription, setEditSubscription] = useState(false);
  const [editSchool, setEditSchool] = useState(false);
  const [editUI, setEditUI] = useState(false);
  const [editAdmin, setEditAdmin] = useState(false);
  const [logoUploadClicked, setlogoUploadClicked] = useState(false);
  const [deleteClicked, setDeleteClicked] = useState(false);
  useEffect(() => {
    setUI(JSON.parse(school.ui));
    setAdmin(JSON.parse(school.admin));
    setExpiry(school.subscription_expiry);
    setSchoolDetails(school);
    setStatus(school.is_active);
    setCountriesToView(Object.keys(Countries));
    setSelectedCountry(school.country);
  }, [school]);
  const searchCountry = (event) => {
    event.preventDefault();
    const inputValue = event.target.value.toLowerCase();

    if (inputValue === "") {
      setCountriesToView(Object.keys(Countries));
    } else {
      let matchedCountries = Object.keys(Countries).filter((key) =>
        key.toLowerCase().includes(inputValue)
      );
      setCountriesToView(matchedCountries);
    }
  };
  const handleCountryChange = (country) => {
    let countryCode = "";
    for (const [key, value] of Object.entries(Countries)) {
      if (key.toLowerCase() === country.toLowerCase()) {
        countryCode = value;
        break;
      }
    }
    setSchoolDetails({
      ...schoolDetails,
      country: countryCode,
    });
    setSelectedCountry(country);
    setViewCountryDropdown(false);
    console.log(countryCode);
  };
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
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    setlogoUploadClicked(true);
    event.preventDefault();
    const selectedFile = event.target.files[0];
    setLogo(selectedFile);

    const img = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    });
    img.then((result) => {
      setLogoPreview(result);
    });

    try {
      const formData = new FormData();
      //formData.append("_method", "PUT");
      formData.append("id", String(school.id));
      formData.append("logo", event.target.files[0]);
      const response = await UpdateLogo(formData);

      if (response.status === 200) {
        toast.success("Updated");
        setlogoUploadClicked(false);
        setTimeout(() => {
          reload();
          setEditUI(false);
        }, 500);
      } else {
        toast.error("Something went wrong");
        setlogoUploadClicked(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setlogoUploadClicked(false);
    }
  };

  const updateUI = async () => {
    if (UIChange.primary_clr !== "" && UIChange.secondary_clr !== "") {
      const response = await UpdateUI({
        id: school.id,
        ui: JSON.stringify(UIChange),
      });
      if (response.status === 200) {
        toast.success("Updated");
        setTimeout(() => {
          setUI(UIChange);
          setEditUI(false);
          reload();
        }, 500);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };

  useEffect(() => {
    const formattedDate = (date) => {
      if (!date || isNaN(date.getTime())) {
        return "";
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setSelectedDateStr(formattedDate(selectedDate));
  }, [selectedDate]);

  const updateExpiry = async () => {
    if (selectedDateStr !== "" && mins !== "" && hour !== "") {
      const response = await UpdateExpiry({
        id: school.id,
        subscription_expiry: `${selectedDateStr} ${hour}:${mins}:00`,
      });
      if (response.status === 200) {
        toast.success("Updated");
        setTimeout(() => {
          setExpiry(`${selectedDateStr} ${hour}:${mins}:00`);
          setEditSubscription(false);
          reload();
        }, 500);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };

  const updateInfo = async () => {
    if (
      schoolDetails.name !== "" &&
      schoolDetails.address !== "" &&
      schoolDetails.email !== "" &&
      schoolDetails.phone !== "" &&
      schoolDetails.country !== "" &&
      schoolDetails.currency !== ""
    ) {
      const response = await UpdateInfo({
        id: school.id,
        name: schoolDetails.name,
        address: schoolDetails.address,
        email: schoolDetails.email,
        phone: schoolDetails.phone,
        country: schoolDetails.country,
        currency: schoolDetails.currency,
        pickup: schoolDetails.pickup,
        delivery: schoolDetails.delivery,
      });
      if (response.status === 200) {
        toast.success("Updated");
        setTimeout(() => {
          setEditSchool(false);
          reload();
        }, 500);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };

  const updateAdmin = async () => {
    if (
      admin.first_name !== "" &&
      admin.last_name !== "" &&
      admin.email !== "" &&
      admin.mobile_no !== "" &&
      admin.password !== ""
    ) {
      const response = await UpdateAdmin({
        id: school.id,
        admin: JSON.stringify(admin),
      });
      if (response.status === 200) {
        toast.success("Updated");
        setTimeout(() => {
          setEditAdmin(false);
          reload();
        }, 500);
      } else {
        toast.error("Something went wrong");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };

  const deleteSchool = async () => {
    try {
      const response = await DeleteSchool(school.id);
      if (response.status === 200) {
        toast.success("Deleted");
        setTimeout(() => {
          reload();
          close();
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const updateStatus = async (e) => {
    try {
      const response = await UpdateStatus({
        id: school.id,
        is_active: e.target.checked,
      });
      if (response.status === 200) {
        toast.success("status changed");
        setStatus(!status);
        setTimeout(() => {
          reload();
        }, 1000);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
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
                  onClick={() => {
                    close();
                    reload();
                  }}
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

          <div className="flex w-full items-center">
            <div className="flex-grow">
              <p class="mt-5 text-lg font-bold leading-7 text-gray-800">
                Edit school
              </p>
            </div>

            <div className="pt-4 flex">
              <div className="flex">
                {status ? (
                  <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                    <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                    Active
                  </span>
                ) : (
                  <span class="inline-flex items-center bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-orange-900 dark:text-orange-300">
                    <span class="w-2 h-2 me-1 bg-orange-500 rounded-full"></span>
                    Inactive
                  </span>
                )}
              </div>
              <label class="relative inline-flex items-center cursor-pointer ml-6">
                <input
                  id="active-status"
                  type="checkbox"
                  checked={status}
                  value={status}
                  class="sr-only peer"
                  onChange={(e) => {
                    updateStatus(e);
                  }}
                />
                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
        <div class="col-span-8 overflow-hidden rounded-xl sm:px-8 ">
          <hr class="mt-4 mb-8" />
          <p class="py-2 text-xl font-semibold">Subscription</p>
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p class="text-gray-600">
              Subscription expires on <strong>{expiry}</strong>
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
                  onClick={updateExpiry}
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
                Name : <strong>{schoolDetails.name}</strong>
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
                Email : <strong>{schoolDetails.email}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Phone : <strong>{schoolDetails.phone}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Address : <strong>{schoolDetails.address}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Country : <strong>{schoolDetails.country}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Currency : <strong>{schoolDetails.currency}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Pickup : <strong>{schoolDetails.pickup ? "Yes" : "No"}</strong>
              </p>
            </div>
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p class="text-gray-600">
                Delivery :{" "}
                <strong>{schoolDetails.delivery ? "Yes" : "No"}</strong>
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
                      value={schoolDetails.name}
                      onChange={(e) => {
                        setSchoolDetails({
                          ...schoolDetails,
                          name: e.target.value,
                        });
                      }}
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
                      value={schoolDetails.email}
                      onChange={(e) => {
                        setSchoolDetails({
                          ...schoolDetails,
                          email: e.target.value,
                        });
                      }}
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
                      value={schoolDetails.address}
                      onChange={(e) => {
                        setSchoolDetails({
                          ...schoolDetails,
                          address: e.target.value,
                        });
                      }}
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
                      <div class="flex items-center justify-center">
                        <div class="relative">
                          <button
                            type="button"
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                            onClick={() =>
                              setViewCountryDropdown(!viewCountryDropdown)
                            }
                          >
                            <span class="mr-2 w-36 max-w-36">
                              {selectedCountry}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="w-5 h-5 ml-2 -mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </button>
                          <div
                            class={`${
                              viewCountryDropdown ? "absolute mt-2" : "hidden"
                            }  z-index-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1`}
                          >
                            <input
                              id="searchcountry"
                              class="block w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none"
                              type="text"
                              placeholder="Search"
                              onChange={(e) => searchCountry(e)}
                            />
                            <div className="overflow-y-auto h-32">
                              {countriesToView.map((country, index) => (
                                <div
                                  key={index}
                                  class="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md"
                                  onClick={(e) => {
                                    handleCountryChange(country);
                                    e.preventDefault();
                                  }}
                                >
                                  {country}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 hidden border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                        value={schoolDetails.country}
                        onChange={(e) => {
                          setSchoolDetails({
                            ...schoolDetails,
                            country: e.target.value,
                          });
                        }}
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
                        value={schoolDetails.currency}
                        onChange={(e) => {
                          setSchoolDetails({
                            ...schoolDetails,
                            currency: e.target.value,
                          });
                        }}
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
                      disabled
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      value={schoolDetails.id}
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
                      value={schoolDetails.phone}
                      onChange={(e) => {
                        setSchoolDetails({
                          ...schoolDetails,
                          phone: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div className="mt-10 flex">
                    <label class="relative inline-flex items-center cursor-pointer ml-6">
                      <input
                        id="delivery"
                        type="checkbox"
                        checked={schoolDetails.delivery}
                        value={schoolDetails.delivery}
                        class="sr-only peer"
                        onChange={(e) => {
                          setSchoolDetails({
                            ...schoolDetails,
                            delivery: e.target.checked,
                          });
                        }}
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
                        checked={schoolDetails.pickup}
                        value={schoolDetails.pickup}
                        class="sr-only peer"
                        onChange={(e) => {
                          setSchoolDetails({
                            ...schoolDetails,
                            pickup: e.target.checked,
                          });
                        }}
                      />
                      <div
                        className={`${
                          schoolDetails.pickup ? "" : ""
                        } w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600`}
                      ></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        pick-up
                      </span>
                    </label>
                  </div>
                  <div>
                    <button
                      className="ml-6 border my-16 px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-900"
                      onClick={updateInfo}
                    >
                      update
                    </button>
                    <input type="button" onChange={handleFileChange} />
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
            <div className="w-2/3 my-8">
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
                  <div>
                    <button
                      className=" border px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-900"
                      onClick={updateUI}
                    >
                      update
                    </button>
                  </div>
                </div>
                <div className="w-1/2 m-4 ">
                  <div className="flex">
                    <div className="flex sm:col-span-4 w-36 h-36">
                      <img
                        className="border rounded w-36 h-36"
                        src={`${s3base_URL}${school.logo}`}
                        alt="School logo"
                        onError={(e) => {
                          e.target.src = hologoLogo;
                        }}
                      />
                      <div>
                        <button
                          className="ml-6 border my-16 px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-900"
                          onClick={handleUpdateClick}
                        >
                          <svg
                            aria-hidden="true"
                            role="status"
                            className={`${
                              logoUploadClicked ? "inline" : "hidden"
                            } w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600`}
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="#1C64F2"
                            />
                          </svg>
                          {logoUploadClicked ? "Please wait" : "Change"}
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
                </div>
              </div>
              <div class="">
                <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4"></div>
              </div>

              <div class="mb-4"></div>
              <div class="ml-56 items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4"></div>
            </div>
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
          {editAdmin && (
            <div className="w-2/3 my-8">
              <div className="flex justify-center my-4">
                <div className="w-1/2">
                  <div className="mb-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      First name
                      <span className="required text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      value={admin.first_name}
                      onChange={(e) =>
                        setAdmin({
                          ...admin,
                          first_name: e.target.value,
                        })
                      }
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
                      value={admin.email}
                      onChange={(e) =>
                        setAdmin({
                          ...admin,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                      <span className="required text-red-500"> *</span>
                    </label>
                    <input
                      type="password"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      value={admin.password}
                      onChange={(e) =>
                        setAdmin({
                          ...admin,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="w-1/2 mx-2 ">
                  <div className="mb-2">
                    <label
                      for="name"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Last name
                      <span className="required text-red-500"> *</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      required=""
                      value={admin.last_name}
                      onChange={(e) =>
                        setAdmin({
                          ...admin,
                          last_name: e.target.value,
                        })
                      }
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
                      value={admin.mobile_no}
                      onChange={(e) =>
                        setAdmin({
                          ...admin,
                          mobile_no: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <button
                      className="ml-6 border my-8 px-4 py-2 rounded-xl text-xs text-gray-600 hover:text-gray-900"
                      onClick={updateAdmin}
                    >
                      update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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
            <button
              class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2"
              onClick={() => setDeleteClicked(true)}
            >
              Continue with deletion
            </button>
          </div>
          {deleteClicked && (
            <DeleteView
              cancel={() => {
                setDeleteClicked(false);
              }}
              deleteSchool={deleteSchool}
            />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default EditSchoolView;
