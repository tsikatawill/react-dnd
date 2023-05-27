import { FC, ButtonHTMLAttributes } from "react";
import { Button } from ".";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
};

export const TodoItemButton: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <Button
      className="hover:bg-blue-500 bg-slate-600  hover:scale-110 transition-all duration-200 ease-out h-8 w-8 grid place-content-center rounded-full"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
