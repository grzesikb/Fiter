import React from "react";
import CSS from "csstype";
import "./ProductPanel.css";
export interface Props {
  onClick?: () => any;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const ProductPanel = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={"ProductPanel " + props.customClassName}
      style={props.customStyles}
    ></div>
  );
};
