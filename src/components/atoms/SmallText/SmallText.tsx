import React from "react";
import CSS from "csstype";
import "./SmallText.css";
export interface Props {
  onClick?: () => any;
  content: string;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const SmallText = (props: Props) => {
  return (
    <text
      onClick={props.onClick}
      className={"SmallText " + props.customClassName}
      style={props.customStyles}
    >
      {props.content}
    </text>
  );
};
