import React from "react";
import CSS from "csstype";
import "./AppButton.css";
export interface Props {
  onClick?: () => any;
  textContext: string;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const AppButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className={"AppButton " + props.customClassName}
      style={props.customStyles}
    >
      {props.textContext}
    </button>
  );
};
