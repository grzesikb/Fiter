import React from "react";
import CSS from "csstype";
import "./Search.css";

export interface Props {
  placeholder: string;
  customClassName?: string;
  customStyles?: CSS.Properties;
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
      />
    </div>
  );
};
