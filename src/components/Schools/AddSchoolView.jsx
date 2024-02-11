import React, { useState, useEffect, useRef } from "react";
import hologoLogo from "../assets/Hologo_logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ColorPicker from "./ColorPicker";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AddSchool } from "../../api/SchoolAPI";
const AddSchoolView = ({ closeModal, reload }) => {
  const fileInputRef = useRef(null);
  const [logo, setLogo] = useState(hologoLogo);
  const MAX_WIDTH = 200;
  const MAX_HEIGHT = 200;
  const [logoPreview, setLogoPreview] = useState(hologoLogo);
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
    email: "",
    phone: "",
    address: "",
    country: "",
    currency: "",
    subscription_expiry: "",
    logo: "",
    delivery: false,
    pickup: false,
    admin: "",
    ui: "",
  });

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

  const handlefirstClick = () => {
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
      schoolDetails.currency !== "" &&
      selectedDateStr !== "" &&
      hour !== "" &&
      mins !== ""
    ) {
      setEnterUIDetailsClicked(true);
      setEnterAdminDetailsClicked(false);
      setEnterSchoolDetailsClicked(false);
      console.log(schoolDetails);
    } else {
      toast.error("Required fields are empty");
    }
  };

  const handleSecondClick = () => {
    if (uiDetails.primary_clr !== "" && uiDetails.secondary_clr) {
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
  const handleSubmit = () => {
    if (
      adminDetails.last_name !== "" &&
      adminDetails.first_name !== "" &&
      adminDetails.email !== "" &&
      adminDetails.mobile_no !== "" &&
      adminDetails.password !== ""
    ) {
      setSchoolDetails((prevDetails) => ({
        ...prevDetails,
        admin: JSON.stringify(adminDetails),
      }));

      setTimeout(() => {
        addSchool();
      }, 100);
    } else {
      toast.error("Required fields are empty");
    }
  };
  const addSchool = async () => {
    const response = await AddSchool(schoolDetails);
    if (response.status === 201) {
      toast.success("School added");
      setTimeout(() => {
        closeModal();
        reload();
      }, 1300);
    } else {
      toast.error("Something went wrong");
      console.log(logo);
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
                    class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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
                    class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSecondClick}
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {enterAdminDetailsClicked && (
              <form action="#">
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
                    class="w-full sm:w-auto justify-center text-white inline-flex bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={handleSubmit}
                  >
                    Add
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
