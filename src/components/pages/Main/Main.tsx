import { useContext, useEffect, useState } from "react";
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
import { AuthContext } from "../../../auth/auth.context";

export interface ProductInterface {
  productID: string | null;
  name: string;
  amount: number;
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
  const navigate = useNavigate();
  const { dispatch, state } = useContext(AuthContext);
  const [dataProduct, setDataProduct] = useState<ProductInterface[]>([]);
  const [searchState, setSeatchState] = useState({
    isOn: false,
    value: "",
    content: "Twój dzisiejszy dzień ",
  });

  useEffect(() => {
    getDocs(dbUserProducts)
      .then((snapshot) => {
        const allUsersProducts = snapshot.docs.map(
          (doc) => doc.data() as UserProductInterface
        );
        const userProductsObject = allUsersProducts.filter(
          (u) => u.userID === state.user?.userID
        );
        if (userProductsObject) {
          getDocs(dbProducts)
            .then((snapshot) => {
              const allProducts = snapshot.docs.map(
                (doc) => doc.data() as ProductInterface
              );

              let product: any[] = [];
              let product2: any[] = [];

              userProductsObject.forEach((item) => {
                allProducts.forEach((item2) => {
                  if (item.productID === item2.productID) product.push(item2);
                });
              });
              userProductsObject.forEach((item) => {
                product.forEach((item2) => {
                  if (item.productID === item2.productID)
                    product2.push({
                      ...item2,
                      amount: item.amount,
                      calories: Math.round(
                        (item2.calories * item.amount) / 100
                      ),
                      proteins:
                        Math.round(
                          ((item2.proteins * item.amount) / 100) * 10
                        ) / 10,
                      fats:
                        Math.round(((item2.fats * item.amount) / 100) * 10) /
                        10,
                      carbohydrates:
                        Math.round(
                          ((item2.carbohydrates * item.amount) / 100) * 10
                        ) / 10,
                    });
                });
              });
              if (product2) {
                setDataProduct(product2);
              }
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

  const [totalNutrients, setTotalNutrients] = useState({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
  });

  useEffect(() => {
    const totalNutrientsData = dataProduct.reduce(
      (total, product) => {
        return {
          calories: ((total.calories + product.calories) * 10) / 10,
          proteins: ((total.proteins + product.proteins) * 10) / 10,
          fats: ((total.fats + product.fats) * 10) / 10,
          carbohydrates:
            ((total.carbohydrates + product.carbohydrates) * 10) / 10,
        };
      },
      {
        calories: 0,
        proteins: 0,
        fats: 0,
        carbohydrates: 0,
      }
    );
    setTotalNutrients(totalNutrientsData);

    console.log(searchState);
  }, [dataProduct, searchState]);

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
          <Search
            placeholder={"Wyszukaj produkt po nazwie"}
            onChange={(event) => {
              setSeatchState((prev) => ({
                ...prev,
                value: event.target.value,
              }));
            }}
            data={searchState.value}
          />
        </div>
      </div>
      <ul className={"List"}>
        <SmallText content={searchState.content} />

        {searchState.isOn
          ? "Elo"
          : dataProduct.map((product) => (
              <ProductPanel key={Math.random()} product={product} />
            ))}

        <li className="SaveArea"></li>
      </ul>
      <BottomBar
        calories={totalNutrients.calories}
        proteins={totalNutrients.proteins}
        fats={totalNutrients.fats}
        carbohydrates={totalNutrients.carbohydrates}
      />
    </div>
  );
};

export default Main;
