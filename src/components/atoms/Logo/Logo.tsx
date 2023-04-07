import React from "react";
import CSS from "csstype";
import "./Logo.css";
export interface Props {
  onClick?: () => any;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const Logo = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={"Logo " + props.customClassName}
      style={props.customStyles}
    >
      Fiter
    </div>
  );
};
