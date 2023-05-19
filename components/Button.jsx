import Link from "next/link";

import { cva } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva("rounded-lg transition-colors duration-300", {
  variants: {
    color: {
      primary: "bg-black text-white hover:bg-gray-700 ",
      secondary: "bg-white text-black hover:bg-gray-200 rounded-full",
      danger: "bg-rose-500 text-white hover:bg-rose-200 duration-300",
    },
    size: {
      default: "py-3 px-6 ",
      full: "block text-center w-full text-2xl px-6 py-3",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "default",
  },
});

const Button = ({ href, placeholder, color, size }) => {
  return (
    <Link href={href} className={clsx(buttonVariants({ color, size }))}>
      {placeholder}
    </Link>
  );
};

export default Button;
