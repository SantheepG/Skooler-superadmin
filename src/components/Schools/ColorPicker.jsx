import React, { useEffect, useState } from "react";
import { colorVariants } from "../../color";
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

  const handleClose = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500);
  };

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
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          handleClose();
        }}
      />
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex bg-${currentColor}`}
      ></div>
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
                      className={`cursor-pointer w-6 h-6 rounded-full mx-1 my-1 ${colorVariants[color][variant]}`}
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
