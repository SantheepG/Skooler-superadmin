import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { ImMobile2 } from "react-icons/im";
const ForgetPwd = ({ Cancel }) => {
  return (
    <React.Fragment>
      <div class="max-w-sm mt-12 lg:mt-8 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow">
        <div class="p-6">
          <h2 class="text-xl font-bold text-gray-800 mb-6">Select an option</h2>
          <form>
            <div class="flex cursor-pointer mb-1 h-16 hover:bg-gray-100 rounded-lg pt-5 pl-4">
              <span className="text-lg mt-1">
                <MdOutlineMarkEmailRead />
              </span>
              <span className="ml-2"> Recover through email</span>
            </div>
            <div class="flex cursor-pointer mb-12 h-16 hover:bg-gray-100 rounded-lg pt-5 pl-4">
              <span className="text-lg mt-1">
                <ImMobile2 />
              </span>
              <span className="ml-2">Recover through Mobile</span>
            </div>
            <div class="flex items-center justify-between">
              <a
                class="inline-block align-baseline font-bold text-sm text-blue-800 hover:text-blue-800"
                href="#"
                onClick={Cancel}
              >
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ForgetPwd;
