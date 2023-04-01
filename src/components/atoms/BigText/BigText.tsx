import React from "react";
import CSS from "csstype";
import "./BigText.css";
export interface Props {
  onClick?: () => any;
  content: string;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const BigText = (props: Props) => {
  return (
    <text
      onClick={props.onClick}
      className={"BigText " + props.customClassName}
      style={props.customStyles}
    >
      {props.content}
    </text>
  );
};
