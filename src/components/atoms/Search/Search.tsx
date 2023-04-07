import React, { useState } from "react";
import CSS from "csstype";
import "./Search.css";

export interface Props {
  placeholder: string;
  customClassName?: string;
  customStyles?: CSS.Properties;
  onClick?: () => any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  data?: any;
}

export const Search = (props: Props) => {
  return (
    <div className={"Search"}>
      <img src={"./assets/SearchIcon.svg"} alt={"Search"}></img>
      <input
        type={"text"}
        placeholder={props.placeholder}
        className={"SearchBar " + props.customClassName}
        style={props.customStyles}
        onClick={props.onClick}
        onChange={props.onChange}
        value={props.data}
      />
    </div>
  );
};
