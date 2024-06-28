import React from 'react';

export const Loading = () => {
  return (
    <svg
      version="1.1"
      height="180"
      width="180"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
    >
      <rect x="40" y="50" width="4" height="10" fill="#555">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect x="50" y="50" width="4" height="10" fill="#555">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.2s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
      <rect x="60" y="50" width="4" height="10" fill="#555">
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="translate"
          values="0 0; 0 20; 0 0"
          begin="0.4s"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </rect>
    </svg>
  );
};
