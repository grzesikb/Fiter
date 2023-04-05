import React, { useContext, useEffect, useState } from "react";
import "./Main.css";
import { Search } from "../../atoms/Search/Search";
import { Logo } from "../../atoms/Logo/Logo";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { BottomBar } from "../../atoms/BottomBar/BottomBar";
import { ProductPanel } from "../../molecules/ProductPanel/ProductPanel";
import { useNavigate } from "react-router";
import { dbProducts, dbUserProducts } from "../../../firebaseConfig";
import { getDocs } from "@firebase/firestore";
import AuthContext from "../../../context/AuthContext";

export interface ProductInterface {
  productID: string | null;
  name: string;
  // amount: number;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}
export interface UserProductInterface {
  userID: string;
  productID: string;
  amount: number;
}
const Main = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [testt, setTestt] = useState<ProductInterface[]>([]);
  useEffect(() => {
    getDocs(dbUserProducts)
      .then((snapshot) => {
        const allUsersProducts = snapshot.docs.map(
          (doc) => doc.data() as UserProductInterface
        );
        const userProductsObject = allUsersProducts.filter(
          (u) => u.userID === authContext.user?.userID
        );
        if (userProductsObject) {
          getDocs(dbProducts)
            .then((snapshot) => {
              const allProducts = snapshot.docs.map(
                (doc) => doc.data() as ProductInterface
              );
              userProductsObject.forEach((up) => {
                const userProducts = allProducts.find(
                  (u) => u.productID === up.productID
                );
                if (userProducts)
                  setTestt((prevUserProducts) => [
                    ...prevUserProducts,
                    {
                      ...userProducts,
                      amount: up.amount,
                    },
                  ]);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          console.log("Uzytkownik nie posiada na liscie zadnych produktow");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
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
        {/* <ProductPanel
          customStyles={{
            marginTop: "30px",
            borderTop: "1px solid #252525",
          }}
          product={{
            name: dataUserProducts.name,
            amount: dataUserProducts.amount,
            calories: parseInt(dataUserProducts.calories),
            proteins: parseInt(dataUserProducts.proteins),
            fats: parseInt(dataUserProducts.fats),
            carbohydrates: parseInt(dataUserProducts.carbohydrates),
          }}
        /> */}
        <ProductPanel
          product={{
            productID: null,
            name: "Jaja",
            calories: 50,
            proteins: 40,
            fats: 40,
            carbohydrates: 20,
          }}
          amount={120}
        />
        <li className="SaveArea"></li>
      </ul>
      <BottomBar calories={2000} proteins={70} fats={40} carbohydrates={50} />
    </div>
  );
};

export default Main;
