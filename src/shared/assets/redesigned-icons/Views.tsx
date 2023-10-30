import { FC, HTMLAttributes } from 'react';

export const ViewsIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 13C16.7956 13 17.5587 13.3161 18.1213 13.8787C18.6839 14.4413 19 15.2044 19 16C19 16.7956 18.6839 17.5587 18.1213 18.1213C17.5587 18.6839 16.7956 19 16 19C15.2044 19 14.4413 18.6839 13.8787 18.1213C13.3161 17.5587 13 16.7956 13 16C13 15.2044 13.3161 14.4413 13.8787 13.8787C14.4413 13.3161 15.2044 13 16 13ZM16 8.5C20.8606 8.5 25.0313 11.439 26.8494 15.6358C26.9501 15.8681 26.9501 16.1319 26.8494 16.3642C25.0313 20.561 20.8606 23.5 16 23.5C11.1394 23.5 6.96872 20.561 5.15062 16.3642C5.04995 16.1319 5.04995 15.8681 5.15062 15.6358C6.96872 11.439 11.1394 8.5 16 8.5ZM7.4063 15.5657C7.25674 15.8361 7.25674 16.1639 7.4063 16.4343C8.21404 17.8945 9.38206 19.1273 10.8025 20.0133C12.3617 20.9858 14.1624 21.5013 16 21.5013C17.8376 21.5013 19.6383 20.9858 21.1975 20.0133C22.6179 19.1273 23.786 17.8945 24.5937 16.4343C24.7433 16.1639 24.7433 15.8361 24.5937 15.5657C23.786 14.1055 22.6179 12.8727 21.1975 11.9867C19.6383 11.0142 17.8376 10.4987 16 10.4987C14.1624 10.4987 12.3617 11.0142 10.8025 11.9867C9.38206 12.8727 8.21404 14.1055 7.4063 15.5657Z" fill="currentColor" />
    </svg>
  );
};