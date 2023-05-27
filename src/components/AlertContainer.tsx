import { FC } from "react";
import { Alerts } from "../types";

type AlertProps = {
  type: Alerts;
  text: string;
};

export const AlertContainer: FC<AlertProps> = ({ type, text }) => {
  return (
    <div className="fixed top-0">
      <p className="text-sm">{text}</p>
    </div>
  );
};
