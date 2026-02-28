"use client";

import { ThreeDots } from 'react-loader-spinner';

interface SpinnerProps {
  size?: number | string;
  className?: string;
}

export function Spinner({ size = 15, className = "" }: SpinnerProps) {
  // Convert string sizes to numbers
  let spinnerSize = 15;
  if (typeof size === 'string') {
    switch(size) {
      case 'sm': spinnerSize = 15; break;
      case 'md': spinnerSize = 24; break;
      case 'lg': spinnerSize = 32; break;
      default: spinnerSize = parseInt(size) || 15;
    }
  } else {
    spinnerSize = size;
  }

  return (
    <ThreeDots
      height={spinnerSize}
      width={spinnerSize}
      radius="9"
      color="currentColor"
      ariaLabel="loading"
      wrapperStyle={{}}
      wrapperClass={className}
      visible={true}
    />
  );
}
