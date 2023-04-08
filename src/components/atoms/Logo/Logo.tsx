import React from "react";
import CSS from "csstype";
import "./Logo.css";
export interface Props {
  onClick?: () => any;
  customClassName?: string;
  customStyles?: CSS.Properties;
  edit?: string;
}

export const Logo = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={"Logo " + props.customClassName}
      style={props.customStyles}
    >
      {props.edit ? props.edit : "Fiter"}
    </div>
  );
};
