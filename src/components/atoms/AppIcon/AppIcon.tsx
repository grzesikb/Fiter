import React from "react";
import CSS from "csstype";
import "./AppIcon.css";
export interface Props {
  src: string;
  onClick?: () => any;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const AppIcon = (props: Props) => {
  return (
    <img
      src={props.src}
      onClick={props.onClick}
      className={"AppIcon " + props.customClassName}
      style={props.customStyles}
      alt={"icon"}
    />
  );
};
