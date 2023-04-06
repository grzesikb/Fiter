import React from "react";
import CSS from "csstype";
import "./ProductPanel.css";
import { ProductInterface } from "../../pages/Main/Main";
import { BigText } from "../../atoms/BigText/BigText";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
export interface Props {
  product: ProductInterface;
  onClick?: () => any;
  customClassName?: string;
  customStyles?: CSS.Properties;
}

export const ProductPanel = (props: Props) => {
  return (
    <li
      className={"ProductPanel " + props.customClassName}
      style={props.customStyles}
    >
      <div>
        <BigText content={props.product.name} />
        <SmallText content={props.product.amount + "g"} />
        <BigText content={props.product.calories + ""} />
        <BigText content={props.product.proteins + ""} />
        <BigText content={props.product.fats + ""} />
        <BigText content={props.product.carbohydrates + ""} />
      </div>
      <AppIcon src={"./assets/Delete.svg"} onClick={props.onClick} />
    </li>
  );
};
