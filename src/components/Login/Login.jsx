import React, { useState } from "react";
import Nav from "./Nav";
import ForgetPwd from "./ForgetPwd";
import { createUserwithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = ({ loggedin, onEmailChange }) => {
  const [forgetPwdClicked, setForgetPwdClicked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //onEmailChange(email);
        localStorage.setItem("email", email);
        navigate("/admin");
      })
      .catch((error) => {
        toast.error("Invalid credentials");
        console.log(error);
      });
  };
  return (
    <React.Fragment>
      <div className="fixed w-full">
        <ToastContainer />
        <nav>
          <Nav />
        </nav>

        <div className="h-screen py-20 p-4 md:p-20 lg:p-32 ">
          {!forgetPwdClicked && (
            <div className="max-w-sm mt-2 bg-white rounded-lg overflow-hidden shadow-lg mx-auto box-with-shadow">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Login</h2>
                <p className="text-gray-700 mb-6">
                  Please Login in to your account
                </p>
                <form onSubmit={logIn}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="username"
                    >
                      Email
                    </label>
                    <input
                      className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="email"
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      required=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 font-bold mb-2"
                      for="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="•••••••••••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Log In
                    </button>
                    <a
                      className="inline-block align-baseline font-bold text-sm text-blue-800 hover:text-blue-800"
                      href="#"
                      onClick={() => setForgetPwdClicked(true)}
                    ></a>
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
