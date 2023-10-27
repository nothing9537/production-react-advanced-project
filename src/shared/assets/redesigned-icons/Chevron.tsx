import { FC, HTMLAttributes } from 'react';

export const ChevronIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.3629 12.7738C9.9669 13.1588 9.95805 13.7919 10.3431 14.1879L15.2231 19.2064C15.4341 19.4234 15.7198 19.5242 16 19.5075C16.2802 19.5242 16.5659 19.4234 16.7769 19.2064L21.6569 14.1879C22.042 13.7919 22.0331 13.1588 21.6372 12.7738C21.2412 12.3888 20.6081 12.3976 20.2231 12.7936L16 17.1365L11.7769 12.7936C11.3919 12.3976 10.7588 12.3888 10.3629 12.7738Z" fill="currentColor" />
    </svg>
  );
};
