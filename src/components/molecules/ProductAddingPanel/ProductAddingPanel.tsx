import React from "react";
import CSS from "csstype";
import "./ProductAddingPanel.css";
import { ProductInterface } from "../../pages/Main/Main";
import { BigText } from "../../atoms/BigText/BigText";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";

export interface Props {
  product: ProductInterface;
  onClick?: () => any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  data?: any;
  customClassName?: string;
  customStyles?: CSS.Properties;
  amount?: number;
}

export const ProductAddingPanel = (props: Props) => {
  return (
    <li
      className={"ProductAddingPanel " + props.customClassName}
      style={props.customStyles}
    >
      <div>
        <BigText content={props.product.name} />
        <SmallText content={props.amount ? props.amount + "g" : "100g"} />
        <BigText content={props.product.calories + ""} />
        <BigText content={props.product.proteins + ""} />
        <BigText content={props.product.fats + ""} />
        <BigText content={props.product.carbohydrates + ""} />
      </div>

      <AppIcon src={"./assets/Add.svg"} onClick={props.onClick} />
    </li>
  );
};
