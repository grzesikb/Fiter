import React from "react";
import CSS from "csstype";
import "./SmallText.css";
export interface Props {
  onClick?: () => any;
  content: string | JSX.Element;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const SmallText = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={"SmallText " + props.customClassName}
      style={props.customStyles}
    >
      {props.content}
    </div>
  );
};
