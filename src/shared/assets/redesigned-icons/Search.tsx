import { FC, HTMLAttributes } from 'react';

export const SearchIcon: FC<HTMLAttributes<SVGElement>> = (props) => {
  return (
    <svg {...props} width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.679 19.739C17.4734 20.6748 15.9564 21.116 14.4369 20.9728C12.9175 20.8296 11.5097 20.1127 10.5002 18.9681C9.49062 17.8234 8.95522 16.3371 9.00294 14.8117C9.05065 13.2862 9.67789 11.8363 10.757 10.757C11.8363 9.67789 13.2862 9.05065 14.8117 9.00294C16.3371 8.95522 17.8234 9.49062 18.9681 10.5002C20.1127 11.5097 20.8296 12.9175 20.9728 14.4369C21.116 15.9564 20.6748 17.4734 19.739 18.679L22.779 21.719C22.8777 21.8107 22.9499 21.9273 22.9879 22.0565C23.0259 22.1858 23.0284 22.3229 22.995 22.4534C22.9616 22.5839 22.8937 22.703 22.7983 22.7982C22.7029 22.8933 22.5836 22.961 22.453 22.994C22.3226 23.0274 22.1856 23.0251 22.0565 22.9872C21.9273 22.9494 21.8107 22.8775 21.719 22.779L18.679 19.739ZM19.499 14.999C19.5079 14.4026 19.3981 13.8104 19.176 13.2568C18.9539 12.7032 18.624 12.1993 18.2054 11.7744C17.7868 11.3496 17.2879 11.0121 16.7377 10.7818C16.1875 10.5515 15.597 10.4329 15.0005 10.4329C14.404 10.4329 13.8135 10.5515 13.2633 10.7818C12.7131 11.0121 12.2142 11.3496 11.7956 11.7744C11.377 12.1993 11.047 12.7032 10.825 13.2568C10.6029 13.8104 10.4931 14.4026 10.502 14.999C10.5196 16.1805 11.0013 17.3076 11.843 18.1368C12.6847 18.9661 13.8189 19.4309 15.0005 19.4309C16.1821 19.4309 17.3162 18.9661 18.158 18.1368C18.9997 17.3076 19.4814 16.1805 19.499 14.999Z" fill="currentColor" />
    </svg>
  );
};
