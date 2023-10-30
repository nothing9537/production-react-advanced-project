import { FC, HTMLAttributes } from 'react';

/**
 * @deprecated
 */
export const StarIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M10.0746 1.633C10.3946 0.789 11.6056 0.789 11.9266 1.633L13.9966 7.367C14.0688 7.55379 14.1959 7.71428 14.3613 7.8273C14.5266 7.94031 14.7223 8.00053 14.9226 8H20.0096C20.9496 8 21.3596 9.17 20.6206 9.743L17.0006 13C16.8384 13.1247 16.7199 13.2975 16.6621 13.4937C16.6042 13.6898 16.61 13.8993 16.6786 14.092L18.0006 19.695C18.3226 20.595 17.2806 21.368 16.4926 20.814L11.5756 17.694C11.4072 17.5757 11.2064 17.5122 11.0006 17.5122C10.7948 17.5122 10.594 17.5757 10.4256 17.694L5.50856 20.814C4.72156 21.368 3.67856 20.594 4.00056 19.695L5.32257 14.092C5.39114 13.8993 5.39692 13.6898 5.33907 13.4937C5.28122 13.2975 5.16272 13.1247 5.00057 13L1.38056 9.743C0.640565 9.17 1.05256 8 1.99056 8H7.07756C7.27786 8.00067 7.47363 7.9405 7.63898 7.82747C7.80433 7.71444 7.93147 7.55387 8.00357 7.367L10.0736 1.633H10.0746Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
