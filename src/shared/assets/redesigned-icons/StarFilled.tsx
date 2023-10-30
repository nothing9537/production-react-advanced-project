import { FC, HTMLAttributes } from 'react';

export const StarFilledIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.4902 26.4253C15.8046 26.2396 16.1952 26.2399 16.5092 26.4262L23.7598 30.728C25.1808 31.5717 26.9198 30.3244 26.5458 28.747L24.6306 20.6858C24.5437 20.3199 24.6694 19.9362 24.9559 19.6927L31.3512 14.2568C32.604 13.1929 31.9309 11.1753 30.2855 11.0469L21.8515 10.3446C21.4838 10.314 21.1628 10.0834 21.0165 9.74462L17.7202 2.11428C17.0845 0.628572 14.9155 0.628572 14.2798 2.11428L10.9837 9.72698C10.8372 10.0653 10.5165 10.2956 10.149 10.3262L1.71455 11.0285C0.069104 11.1569 -0.604033 13.1746 0.648749 14.2384L7.04408 19.6743C7.3306 19.9179 7.45628 20.3016 7.36936 20.6674L5.4542 28.7287C5.08023 30.3061 6.81917 31.5534 8.24023 30.7096L15.4902 26.4253Z" fill="currentColor" />
    </svg>
  );
};
