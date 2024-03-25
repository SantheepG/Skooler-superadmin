import React, { useState, useEffect, useRef } from "react";
import hologoLogo from "../assets/Hologo_logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ColorPicker from "./ColorPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddLogo, AddSchool, CheckID } from "../../api/SchoolAPI";
import { Countries } from "../../api/Countries";
const AddSchoolView = ({ closeModal, reload }) => {
  const [selectedCountry, setSelectedCountry] = useState("Country");
  const [countriesToView, setCountriesToView] = useState([]);
  const fileInputRef = useRef(null);
  const [addSchoolClicked, setAddSchoolClicked] = useState(false);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(hologoLogo);
  const [viewCountryDropdown, setViewCountryDropdown] = useState(false);
  const [enterSchoolDetailsClicked, setEnterSchoolDetailsClicked] =
    useState(true);
  const [enterUIDetailsClicked, setEnterUIDetailsClicked] = useState(false);
  const [enterAdminDetailsClicked, setEnterAdminDetailsClicked] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedDateStr, setSelectedDateStr] = useState("");
  const [hour, setHour] = useState("");
  const [mins, setMins] = useState("");
  const [schoolDetails, setSchoolDetails] = useState({
    id: "",
    name: "",
    address: "",
    country: "",
    country_code: "",
    currency: "",
    phone: "",
    email: "",
    ui: "",
    is_active: true,
    subscription_expiry: "",
    delivery: false,
    pickup: false,
    admin: "",
    logo: "",
  });

  useEffect(() => {
    setCountriesToView(Object.keys(Countries));
  }, []);

  const [uiDetails, setUiDetails] = useState({
    primary_clr: "",
    secondary_clr: "",
  });

  const [adminDetails, setAdminDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    roles: JSON.stringify({
      Dashboard: true,
      ManageUsers: true,
      ManageAdmins: true,
      ManageProducts: true,
      ManageOrders: true,
      ManageStock: true,
      ManageEvents: true,
      ManageComplaints: true,
    }),
    password: "",
    profile_pic: null,
  });

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
  const handleUpdateClick = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
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
  };

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

  const handlefirstClick = async () => {
    setSchoolDetails((prevDetails) => ({
      ...prevDetails,
      subscription_expiry: `${selectedDateStr} ${hour}:${mins}:00`,
    }));

    if (
      schoolDetails.id !== "" &&
      schoolDetails.name !== "" &&
      schoolDetails.email !== "" &&
      schoolDetails.phone !== "" &&
      schoolDetails.address !== "" &&
      schoolDetails.country !== "" &&
      schoolDetails.country_code !== "" &&
      schoolDetails.currency !== "" &&
      selectedDateStr !== "" &&
      hour !== "" &&
      mins !== ""
    ) {
      try {
        const response = await CheckID(schoolDetails.id);
        console.log(response.data.available);
        if (response.data.available === true) {
          console.log();
          setEnterUIDetailsClicked(true);
          setEnterAdminDetailsClicked(false);
          setEnterSchoolDetailsClicked(false);
        } else {
          toast.error("A school is already registered with the same ID.");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again");
      }
    } else {
      toast.error("Required fields are empty");
    }
  };

  const handleSecondClick = () => {
    if (
      uiDetails.primary_clr !== "" &&
      uiDetails.secondary_clr &&
      logo !== null
    ) {
      setSchoolDetails((prevDetails) => ({
        ...prevDetails,
        ui: JSON.stringify(uiDetails),
      }));

      setEnterUIDetailsClicked(false);
      setEnterAdminDetailsClicked(true);
      setEnterSchoolDetailsClicked(false);
      console.log(uiDetails);
    } else {
      console.log("Required fields are empty");
      console.log(uiDetails);
      toast.error("Required fields are empty");
    }
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

  const handleLogoUpload = async () => {
    setAddSchoolClicked(true);
    try {
      if (
        adminDetails.last_name !== "" &&
        adminDetails.first_name !== "" &&
        adminDetails.email !== "" &&
        adminDetails.mobile_no !== "" &&
        adminDetails.password !== ""
      ) {
        let admin = JSON.stringify(adminDetails);
        //setSchoolDetails((prevDetails) => ({
        //  ...prevDetails,
        //  admin: JSON.stringify(adminDetails),
        //}));
        if (logo) {
          const formData = new FormData();
          formData.append("_method", "POST");
          formData.append("logo", logo);
          const response = await AddLogo(formData);
          if (response.status === 201) {
            //setPath(response.data.logo);
            //setSchoolDetails((prevDetails) => ({
            //  ...prevDetails,
            //  logo: response.data.logo,
            //}));
            //setLogoPreview(reader.result);
            console.log(response.data.path);
            addSchool(response.data.path, admin);
          } else {
            toast.error("Something went wrong");
            setAddSchoolClicked(false);
          }
        } else {
          toast.error("Add a logo to continue");
          setAddSchoolClicked(false);
        }
      } else {
        toast.error("Required fields are empty");
        setAddSchoolClicked(false);
      }
    } catch (error) {
      console.error("Error:", error.message);
      setAddSchoolClicked(false);
    }
  };

  const addSchool = async (path, admin) => {
    try {
      if (admin && path) {
        let data = {
          id: schoolDetails.id,
          name: schoolDetails.name,
          address: schoolDetails.address,
          country: schoolDetails.country,
          country_code: schoolDetails.country_code,
          currency: schoolDetails.currency,
          phone: schoolDetails.phone,
          email: schoolDetails.email,
          ui: schoolDetails.ui,
          is_active: true,
          subscription_expiry: schoolDetails.subscription_expiry,
          delivery: schoolDetails.delivery,
          pickup: schoolDetails.pickup,
          admin: admin,
          logo: path,
        };
        const response = await AddSchool(data);
        if (response.status === 201) {
          toast.success("School added");
          setAddSchoolClicked(false);
          setTimeout(() => {
            closeModal();
            reload();
          }, 1300);
        } else {
          toast.error("Something went wrong");
          setAddSchoolClicked(false);
        }
      } else {
        toast.error("Required fields are empty");
        setAddSchoolClicked(false);
        console.log(admin, " ", path);
      }
    } catch (error) {
      console.log(error);
      setAddSchoolClicked(false);
    }
  };
  return (
    <React.Fragment>
      <div class="relative p-4 w-full max-w-3xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5 ">
          <ToastContainer />
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
                setEnterUIDetailsClicked(false);
                setEnterAdminDetailsClicked(false);
                setEnterSchoolDetailsClicked(true);
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
            {enterSchoolDetailsClicked && (
              <form action="#">
                <h5 className="text-gray-500">School details</h5>
                <hr class="border-gray-300 mb-4 mt-2" />
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
                      <div className="">
                        <label
                          for="country"
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
                                viewCountryDropdown ? "fixed" : "hidden"
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
                          name="country"
                          id="country"
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
                    <div className="w-1/3">
                      <label
                        for="name"
                        class="block mb-2  text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country code
                        <span className="required text-red-500"> *</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                        value={schoolDetails.country_code}
                        onChange={(e) => {
                          setSchoolDetails({
                            ...schoolDetails,
                            country_code: e.target.value,
                          });
                        }}
                      />
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
                        value={schoolDetails.id}
                        onChange={(e) => {
                          setSchoolDetails({
                            ...schoolDetails,
                            id: e.target.value,
                          });
                        }}
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
                            className="mr-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
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
                            className="ml-1 py-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-1/2 p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            onChange={(e) => handleMinChange(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-10 flex">
                      <label class="relative inline-flex items-center cursor-pointer ml-6">
                        <input
                          id="delivery"
                          type="checkbox"
                          checked={schoolDetails.delivery}
                          value={schoolDetails.delivery}
                          class="sr-only peer"
                          onChange={() =>
                            setSchoolDetails({
                              ...schoolDetails,
                              delivery: !schoolDetails.delivery,
                            })
                          }
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
                          onChange={() =>
                            setSchoolDetails({
                              ...schoolDetails,
                              pickup: !schoolDetails.pickup,
                            })
                          }
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
                      setEnterUIDetailsClicked(true);
                      setEnterAdminDetailsClicked(false);
                      setEnterSchoolDetailsClicked(false);
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
                    class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    onClick={handlefirstClick}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {enterUIDetailsClicked && (
              <form action="#">
                <h5 className="text-gray-500">UI details</h5>
                <hr class="border-gray-300 mb-4 mt-2" />
                <div className="flex justify-center mb-56">
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
                          setUiDetails({
                            ...uiDetails,
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
                          setUiDetails({
                            ...uiDetails,
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
                            update
                          </button>
                          <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                            accept="image/*"
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
                      setEnterUIDetailsClicked(false);
                      setEnterAdminDetailsClicked(false);
                      setEnterSchoolDetailsClicked(true);
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    onClick={handleSecondClick}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {enterAdminDetailsClicked && (
              <div>
                <h5 className="text-gray-500">Master admin details</h5>
                <hr class="border-gray-300 mb-4 mt-2" />
                <div className="flex justify-center mb-6">
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
                        value={adminDetails.first_name}
                        onChange={(e) =>
                          setAdminDetails({
                            ...adminDetails,
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
                        value={adminDetails.email}
                        onChange={(e) =>
                          setAdminDetails({
                            ...adminDetails,
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
                        type="text"
                        name="name"
                        id="name"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        required=""
                        value={adminDetails.password}
                        onChange={(e) =>
                          setAdminDetails({
                            ...adminDetails,
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
                        value={adminDetails.last_name}
                        onChange={(e) =>
                          setAdminDetails({
                            ...adminDetails,
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
                        value={adminDetails.mobile_no}
                        onChange={(e) =>
                          setAdminDetails({
                            ...adminDetails,
                            mobile_no: e.target.value,
                          })
                        }
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
                      setEnterUIDetailsClicked(true);
                      setEnterAdminDetailsClicked(false);
                      setEnterSchoolDetailsClicked(false);
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    class="py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-1 focus:outline-none focus:ring-gray-700 focus:text-gray-500 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
                    onClick={handleLogoUpload}
                  >
                    <svg
                      aria-hidden="true"
                      role="status"
                      className={`${
                        addSchoolClicked ? "inline" : "hidden"
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
                    {addSchoolClicked ? "Please wait" : "Add school"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AddSchoolView;
