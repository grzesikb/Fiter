import React from "react";
import "./Main.css";
import { Search } from "../../atoms/Search/Search";
import { Logo } from "../../atoms/Logo/Logo";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { BottomBar } from "../../atoms/BottomBar/BottomBar";
import { ProductPanel } from "../../molecules/ProductPanel/ProductPanel";
const Main = () => {
  return (
    <div className={"Main"}>
      <div className={"NavbarSpace"}>
        <div className={"Navbar"}>
          <Logo />
          <div className={"Icons"}>
            <AppIcon src={"./assets/LogOut.svg"} />
            <AppIcon src={"./assets/Add.svg"} />
          </div>
          <Search placeholder={"Wyszukaj produkt po nazwie"} />
        </div>
      </div>
      <div className={"List"}>
        <SmallText content={"Twój dzisiejszy dzień "} />
        <ProductPanel customStyles={{ marginTop: "50px" }} />
        <ProductPanel /> <ProductPanel />
        <ProductPanel />
        <ProductPanel />
        <ProductPanel />
        <ProductPanel />
        <ProductPanel />
        <ProductPanel />
      </div>
      <BottomBar calories={2000} proteins={70} fats={40} carbohydrates={50} />
    </div>
  );
};

export default Main;
