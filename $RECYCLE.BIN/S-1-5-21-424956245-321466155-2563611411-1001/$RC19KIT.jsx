import { useState } from "react";

const ColorPicker = ({ initialColor, onChange }) => {
  const [color, setColor] = useState(initialColor);

  const handleColorPick = (e) => {
    const newColor = e.target.value;
    setColor(newColor);
    onChange(newColor);
  };

  return (
    <div className="mt-3 flex items-center gap-2">
      {/* Display color as background of the div */}
      <div
        style={{ backgroundColor: color }}
        className="h-7 w-7 cursor-pointer"
        onClick={() => document.getElementById("colorPicker").click()} // Trigger hidden input click on div click
      ></div>
      <input
        id="colorPicker"
        type="color"
        value={color}
        onChange={handleColorPick}
        style={{ display: "none" }} // Hide the actual input element
      />
      <p className="text-base font-normal">Primary Color</p>
    </div>
  );
};


