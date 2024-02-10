import React, { useEffect, useState } from "react";

const ColorPicker = ({ updateClr }) => {
  const [currentColor, setCurrentColor] = useState("");
  const [iconColor, setIconColor] = useState("text-white");
  const [isOpen, setIsOpen] = useState(false);
  const [colors, setColors] = useState([
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
  ]);
  const [variants, setVariants] = useState([
    100, 200, 300, 400, 500, 600, 700, 800, 900,
  ]);

  const initColor = () => {
    setCurrentColor("red-800");
    setIconWhite();
  };

  const setIconWhite = () => {
    setIconColor("text-white");
  };

  const setIconBlack = () => {
    setIconColor("text-black");
  };

  const selectColor = (color, variant) => {
    setCurrentColor(`${color}-${variant}`);
    if (variant < 500) {
      setIconBlack();
    } else {
      setIconWhite();
    }
  };

  useEffect(() => {
    updateClr({ target: { value: currentColor } });
  }, [currentColor, updateClr]);

  return (
    <div className="flex flex-row relative">
      <input
        id="color-picker"
        class="bg-gray-50 z-0 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        value={currentColor}
        onChange={(e) => setCurrentColor(e.target.value)}
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex bg-${currentColor}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mx-auto my-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
          />
        </svg>
      </div>
      {isOpen && (
        <div
          className="border z-50 border-gray-300 origin-top-right absolute right-0 top-full mt-2 rounded-md shadow-lg"
          onClick={() => setIsOpen(false)}
        >
          <div className="rounded-md bg-white shadow-xs p-2">
            <div className="flex">
              {colors.map((color) => (
                <div key={color}>
                  {variants.map((variant) => (
                    <div
                      key={`${color}-${variant}`}
                      className={`bg-${color}-${variant} cursor-pointer w-6 h-6 rounded-full mx-1 my-1`}
                      onClick={() => selectColor(color, variant)}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
