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
          <text>{props.calories}</text>
        </div>
        <div>
          Białko
          <text>{props.proteins}</text>
        </div>
        <div>
          Tłuszcze
          <text>{props.fats}</text>
        </div>
        <div>
          Węgle
          <text>{props.carbohydrates}</text>
        </div>
      </div>
    </div>
  );
};
