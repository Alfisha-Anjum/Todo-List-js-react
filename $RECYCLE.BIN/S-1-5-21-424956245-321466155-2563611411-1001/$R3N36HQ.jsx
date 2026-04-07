// "use client";
// import React, { useState } from 'react'
// import { ChromePicker } from "react-color";
// const ColorPicker = () => {
//     const [color, setColor] = useState("#fff");

//   const handleChangeComplete = (newColor) => {
//     setColor(newColor.hex);
//   }
//   return (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Color Picker</h1>
//       <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
//       <div style={{ marginTop: "20px" }}>
//         <p>Selected Color:</p>
//         <div
//           style={{
//             width: "100px",
//             height: "100px",
//             backgroundColor: color,
//             margin: "auto",
//             border: "1px solid #000",
//           }}
//         ></div>
//         <p>{color}</p>
//       </div>
//     </div>
//   );
//   }

// export default ColorPicker


"use client";
import React from "react";
import { ChromePicker } from "react-color";

const ColorPicker = ({ backgroundColor, setColor }) => {
  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex); // Update the color when it's changed
  };
console.log(backgroundColor, "xolor");
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Background Color</h1>
      <ChromePicker
        color={backgroundColor}
        onChangeComplete={handleChangeComplete}
      />
      <div style={{ marginTop: "20px" }}>
        <p>Selected Color:</p>
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: backgroundColor,
            margin: "auto",
            border: "1px solid #000",
          }}
        ></div>
        {/* <p>{color}</p> */}
      </div>
    </div>
  );
};

export default ColorPicker;
