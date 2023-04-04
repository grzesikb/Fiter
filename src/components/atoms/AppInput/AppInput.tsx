import React from "react";
import CSS from "csstype";
import "./AppInput.css";

export interface Props {
  placeholder: string;
  customClassName?: string;
  customStyles?: CSS.Properties;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  data?: any;
  type?: string;
}

export const AppInput = (props: Props) => {
  return (
    <input
      type={props.type ? props.type : "text"}
      placeholder={props.placeholder}
      className={"AppInput " + props.customClassName}
      style={props.customStyles}
      onChange={props.onChange}
      value={props.data}
    />
  );
};
