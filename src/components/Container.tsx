import clsx from "clsx";
import { FC, HTMLAttributes } from "react";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  extraClasses?: string;
};

export const Container: FC<ContainerProps> = ({ children, extraClasses }) => {
  return (
    <div className={clsx("max-w-screen-lg mx-auto px-2 sm:px-5", extraClasses)}>
      {children}
    </div>
  );
};
