import type { SVGProps } from "react";

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width="20"
    height="20"
    aria-hidden="true"
    {...props}
  >
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.83-5.97 6.83H1.65l7.73-8.84L1.2 2.25h6.83l4.72 6.24 5.49-6.24Zm-1.16 17.52h1.83L7.02 4.13H5.06l12.02 15.64Z" />
  </svg>
);

export default XIcon;
