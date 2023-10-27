import { FC, HTMLAttributes } from 'react';

export const EtcIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg {...props} width="12" height="32" viewBox="0 0 12 32" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="23" r="2" transform="rotate(-90 6 23)" fill="currentColor" />
      <circle cx="6" cy="16" r="2" transform="rotate(-90 6 16)" fill="currentColor" />
      <circle cx="6" cy="9" r="2" transform="rotate(-90 6 9)" fill="currentColor" />
    </svg>
  );
};
