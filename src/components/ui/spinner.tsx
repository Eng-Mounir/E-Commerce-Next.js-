"use client";

import { Audio } from 'react-loader-spinner';

export function Spinner({ size = 15, className = "" }) {
  // Convert number size to appropriate format for the spinner
  const spinnerSize = typeof size === 'number' ? size : 15;
  
  return (
    <Audio
      height={spinnerSize}
      width={spinnerSize}
      color="#000000"
      ariaLabel="loading"
      wrapperStyle={{}}
      wrapperClass={className}
      visible={true}
    />
  );
}
