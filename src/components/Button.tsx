import { MotionProps, motion } from "framer-motion";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & MotionProps;

export const Button: FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.97,
        transition: { duration: 0.05, ease: "easeOut" },
      }}
      {...rest}
    >
      {children}
    </motion.button>
  );
};
