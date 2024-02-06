import React, { useState } from "react";
import Nav from "./Nav";
import ForgetPwd from "./ForgetPwd";
import { createUserwithEmailAndPassword } from "firebase/auth";
const Login = ({ loggedin }) => {
  const [forgetPwdClicked, setForgetPwdClicked] = useState(false);
  const [formData, setFormData] = useState({
    mobile_no: "",
    password: "",
  });
  return (
    <React.Fragment>
      <div className="fixed w-full">
        <nav>
          <Nav />
        </nav>

        <div class="h-screen py-20 p-4 md:p-20 lg:p-32 ">
          {!forgetPwdClicked && (
            <div class="max-w-sm mt-2 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow">
              <div class="p-6">
                <h2 class="text-xl font-bold text-gray-800 mb-2">Login</h2>
                <p class="text-gray-700 mb-6">
                  Please Login in to your account
                </p>
                <form>
                  <div class="mb-4">
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="username"
                    >
                      Email
                    </label>
                    <input
                      class="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="phone_no"
                      id="phone_no"
                      type="text"
                      placeholder="example@gmail.com"
                      required=""
                      value={formData.mobile_no}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          mobile_no: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="mb-6">
                    <label
                      class="block text-gray-700 font-bold mb-2"
                      for="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="•••••••••••••••••"
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div class="flex items-center justify-between">
                    <button
                      class="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="button"
                    >
                      Log In
                    </button>
                    <a
                      class="inline-block align-baseline font-bold text-sm text-blue-800 hover:text-blue-800"
                      href="#"
                      onClick={() => setForgetPwdClicked(true)}
                    >
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          )}
          {forgetPwdClicked && (
            <ForgetPwd Cancel={() => setForgetPwdClicked(false)} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
