import * as React from "react";

const ToggleIcon: React.FC<React.SVGProps<SVGAElement>> = (props) => {
  return (
    <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
      <path
        stroke="#635FC7"
        strokeWidth="2"
        fill="none"
        d="m1 1 4 4 4-4"
      ></path>
    </svg>
  );
};

export default ToggleIcon;
