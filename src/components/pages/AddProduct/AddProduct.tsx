import React from "react";
import "./AddProduct.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
const AddProduct = () => {
  return (
    <div className={"AddProduct"}>
      <div className="NavBarAdd">
        <AppIcon src={"./assets/Back.svg"} />
        <div>
          <SmallText content="Dodawanie nowego produktu" />
        </div>
      </div>
      <div className="AddContent">
        <AppInput placeholder="Nazwa Produktu" />
        <div>
          <SmallText
            content="W 100 gramach produktu"
            customStyles={{ color: "#fff" }}
          />
        </div>
        <div className="AddGrid">
          <AppInput placeholder="Kalorie" />
          <AppInput placeholder="Białko" />
          <AppInput placeholder="Tłuszcz" />
          <AppInput placeholder="Węglowodany" />
        </div>
        <AppButton textContext="Dodaj Produkt" />
      </div>
    </div>
  );
};

export default AddProduct;
