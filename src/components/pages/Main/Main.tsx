import React from "react";
import "./Main.css";
import { Search } from "../../atoms/Search/Search";
import { Logo } from "../../atoms/Logo/Logo";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { BottomBar } from "../../atoms/BottomBar/BottomBar";
import { ProductPanel } from "../../molecules/ProductPanel/ProductPanel";
import { useNavigate } from "react-router";

export interface Product {
  name: string;
  amount: number;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}
const Main = () => {
  const navigate = useNavigate();
  return (
    <div className={"Main"}>
      <div className={"NavbarSpace"}>
        <div className={"Navbar"}>
          <Logo />
          <div className={"Icons"}>
            <AppIcon
              src={"./assets/LogOut.svg"}
              onClick={() => (window.location.href = "/auth/login")}
            />
            <AppIcon
              src={"./assets/Add.svg"}
              onClick={() => navigate("/addproduct")}
            />
          </div>
          <Search placeholder={"Wyszukaj produkt po nazwie"} />
        </div>
      </div>
      <ul className={"List"}>
        <SmallText content={"Twój dzisiejszy dzień "} />
        <ProductPanel
          customStyles={{
            marginTop: "30px",
            borderTop: "1px solid #252525",
          }}
          product={{
            name: "Jaja kurze",
            amount: 256,
            calories: 50,
            proteins: 40,
            fats: 40,
            carbohydrates: 20,
          }}
        />
        <ProductPanel
          product={{
            name: "Jaja",
            amount: 256,
            calories: 50,
            proteins: 40,
            fats: 40,
            carbohydrates: 20,
          }}
        />
        <li className="SaveArea"></li>
      </ul>
      <BottomBar calories={2000} proteins={70} fats={40} carbohydrates={50} />
    </div>
  );
};

export default Main;
