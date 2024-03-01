import React, { useEffect, useState } from "react";
import hologoLogo from "../assets/Hologo_logo.png";
import { s3base_URL } from "../../App";
import { base_URL } from "../../App";
const SchoolCard = ({ school, editClicked }) => {
  const [remaining, setRemaining] = useState(0);
  const [logo, setLogo] = useState("");
  const [progressLength, setProgressLength] = useState(0);

  useEffect(() => {
    const createdDate = new Date(school.createdAt);
    const currentDate = new Date();
    const expiryDate = new Date(school.subscription_expiry);
    setLogo(`${base_URL}/super/getlogo/${school.logo_id}`);
    if (isNaN(currentDate) || isNaN(expiryDate)) {
      console.error("Invalid date");
      return;
    }
    const differenceInMilliseconds = expiryDate - currentDate;
    const daysRemaining = Math.ceil(
      differenceInMilliseconds / (1000 * 60 * 60 * 24)
    );

    setRemaining(daysRemaining);

    const maxWidth = 100;
    const progressBarWidth = Math.min(
      (daysRemaining / 30) * maxWidth,
      maxWidth
    );
    setProgressLength(progressBarWidth);
  }, [school]);

  useEffect(() => {}, [school]);
  return (
    <React.Fragment>
      <div className="rounded-md border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center">
          <h5 className="flex-grow whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="text-gray-600">#{school.id} </span>
            {school.name}
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
              src={`${s3base_URL}${school.logo}`}
              onError={(e) => {
                e.target.src = hologoLogo;
              }}
            />
          </div>
          <div className="px-2 text-xs text-gray-600">
            <div className="m-2">
              <span>Email : </span>
              <span>{school.email}</span>
            </div>
            <div className="m-2">
              <span>Phone : </span>
              <span>{school.phone}</span>
            </div>
            <div className="m-2">
              <span>Address : </span>
              <span>
                {school.address}, {school.country}
              </span>
            </div>
            <div className="m-2">
              <span>Currency : </span>
              <span>{school.currency}</span>
            </div>
            <div className="m-2">
              {school.delivery === 1 && (
                <span className="my-1 px-2 border border-green-300 rounded-xl">
                  delivery
                </span>
              )}
              {school.pickup === 1 && (
                <span className="ml-1 my-1 px-2 border border-green-300 rounded-xl">
                  pickup
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="">
          <span className="text-gray-500 text-sm">Subscription</span>
          <span className="float-right text-sm text-gray-400">
            expires on {school.subscription_expiry}
          </span>
          <div className="h-2 overflow-hidden rounded-full bg-gray-300">
            <div
              style={{ width: `${progressLength}%` }}
              className={`h-full bg-blue-500`}
            ></div>
          </div>
          <div className="flex w-full mt-2">
            <div className="flex-grow">
              {remaining < 5 ? (
                <p className="text-sm text-red-500">
                  {remaining} days remaining
                </p>
              ) : (
                <p className="text-sm text-blue-500">
                  {remaining} days remaining
                </p>
              )}
            </div>
            <div className="flex">
              {school.is_active ? (
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
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SchoolCard;
