import { FC, HTMLAttributes } from 'react';

export const CopyIcon: FC<HTMLAttributes<SVGElement>> = ({ ...props }) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M16.2 5V1H1V16.2H5L16.2 5ZM5.8 5.8V21H21V5.8H5.8Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
