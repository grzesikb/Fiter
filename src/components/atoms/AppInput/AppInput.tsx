import React from "react";
import CSS from "csstype";
import "./AppInput.css";

export interface Props {
  placeholder: string;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const AppInput = (props: Props) => {
  return (
    <input
      type={"text"}
      placeholder={props.placeholder}
      className={"AppInput " + props.customClassName}
      style={props.customStyles}
    />
  );
};
