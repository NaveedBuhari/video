import * as React from "react";

const MicOnIcon = (props) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <mask
      id="a"
      style={{
        maskType: "alpha",
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}
    >
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.655 2.996A3.307 3.307 0 0 0 8.6 5.4v6.8c0 .902.38 1.767 1.055 2.404a3.71 3.71 0 0 0 2.545.996 3.71 3.71 0 0 0 2.546-.996A3.307 3.307 0 0 0 15.8 12.2V5.4c0-.902-.38-1.767-1.054-2.404A3.71 3.71 0 0 0 12.2 2a3.71 3.71 0 0 0-2.545.996Zm-3.119 8.198c.17.16.264.376.264.601v.405c0 1.353.569 2.65 1.582 3.606A5.565 5.565 0 0 0 12.2 17.3a5.565 5.565 0 0 0 3.818-1.494c1.013-.956 1.582-2.253 1.582-3.606v-.405c0-.225.095-.441.264-.6a.928.928 0 0 1 .636-.25c.239 0 .468.09.636.25.17.159.264.375.264.6v.405c0 1.656-.64 3.256-1.8 4.498-1.16 1.243-2.76 2.043-4.5 2.25V20.7h1.8c.239 0 .468.09.636.249.17.16.264.376.264.601a.827.827 0 0 1-.264.601.928.928 0 0 1-.636.249H9.5a.928.928 0 0 1-.636-.249.827.827 0 0 1-.264-.601c0-.225.095-.442.264-.601A.928.928 0 0 1 9.5 20.7h1.8v-1.752C7.748 18.53 5 15.668 5 12.2v-.405c0-.225.095-.441.264-.6a.928.928 0 0 1 .636-.25c.239 0 .468.09.636.25Z"
        fill={props.fillColor}
      />
    </g>
  </svg>
);

export default MicOnIcon;