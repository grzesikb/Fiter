import React from "react";
import CSS from "csstype";
import "./BottomBar.css";
export interface Props {
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
  onClick?: () => any;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const BottomBar = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      className={"BottomBar " + props.customClassName}
      style={props.customStyles}
    >
      <div className="BottomBarSpecifies">
        <div>
          Kalorie
          <span>{props.calories}</span>
        </div>
        <div>
          Białka
          <span>{props.proteins}</span>
        </div>
        <div>
          Tłuszcze
          <span>{props.fats}</span>
        </div>
        <div>
          Węgl.
          <span>{props.carbohydrates}</span>
        </div>
      </div>
    </div>
  );
};
