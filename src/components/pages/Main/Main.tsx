import { useContext, useEffect, useState } from "react";
import "./Main.css";
import { Search } from "../../atoms/Search/Search";
import { Logo } from "../../atoms/Logo/Logo";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { BottomBar } from "../../atoms/BottomBar/BottomBar";
import { ProductPanel } from "../../molecules/ProductPanel/ProductPanel";
import { useNavigate } from "react-router";
import { dbProducts, dbUserProducts } from "../../../firebaseInit";
import { getDocs } from "@firebase/firestore";
import { AuthContext } from "../../../auth/auth.context";
import { ProductAddingPanel } from "../../molecules/ProductAddingPanel/ProductAddingPanel";
import Fuse from "fuse.js";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { addDoc, deleteDoc, query, updateDoc, where } from "firebase/firestore";
import Help from "../../atoms/Help/Help";
import { Alert } from "../../atoms/Alert/Alert";

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
  data: string;
  userID: string;
  productID: string;
  amount: number;
}

const Main = () => {
  const navigate = useNavigate();
  const { state } = useContext(AuthContext);

  const [dataProduct, setDataProduct] = useState<ProductInterface[]>([]);

  const [searchState, setSearchState] = useState({
    isOn: false,
    value: "",
    amount: "",
    content: "Twój dzisiejszy dzień",
  });

  const [searchResult, setSearchResult] = useState<ProductInterface[]>([]);

  const [totalNutrients, setTotalNutrients] = useState({
    calories: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
  });

  const [rerenderState, setRerenderState] = useState<number>(0);

  //TODAY DATA
  const today: Date = new Date();
  const day: string = today.getDate().toString().padStart(2, "0");
  const month: string = (today.getMonth() + 1).toString().padStart(2, "0");
  const year: string = today.getFullYear().toString().substr(-2);
  const formatedData = `${day}.${month}.${year}`;

  useEffect(() => {
    getDocs(dbUserProducts)
      .then(async (snapshot) => {
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
  }, [searchState.isOn, rerenderState]);

  const searchProducts = (
    allProducts: ProductInterface[],
    searchString: string
  ): ProductInterface[] => {
    const fuseOptions = {
      keys: ["name"], // Wyszukiwanie będzie przeprowadzane po polu 'name'
      includeScore: true, // Włącz wyniki oceny podobieństwa
      threshold: 0.4, // Wartość progowa oceny podobieństwa
      ignoreLocation: true, // Ignoruj położenie dopasowania
    };
    const fuse = new Fuse(allProducts, fuseOptions);
    const results = fuse.search(searchString);
    const searchResult = results
      .filter(
        (result) =>
          result.score !== undefined && result.score < fuseOptions.threshold
      )
      .map((result) => result.item);
    return searchResult;
  };

  useEffect(() => {
    //BOTTOM BAR
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
    const totalNutrientsDataFixed = {
      calories: Number(totalNutrientsData.calories.toFixed(2)),
      proteins: Number(totalNutrientsData.proteins.toFixed(2)),
      fats: Number(totalNutrientsData.fats.toFixed(2)),
      carbohydrates: Number(totalNutrientsData.carbohydrates.toFixed(2)),
    };
    setTotalNutrients(totalNutrientsDataFixed);

    if (searchState.value === "") {
      setSearchState({
        isOn: false,
        value: searchState.value,
        amount: "100",
        content: `Twój dzień - ${formatedData}`,
      });
    } else {
      setSearchState({
        isOn: true,
        value: searchState.value,
        amount: searchState.amount,
        content: "Twoje wyszukiwania",
      });

      getDocs(dbProducts)
        .then((snapshot) => {
          const allProducts = snapshot.docs.map(
            (doc) => doc.data() as ProductInterface
          );
          const searchResult = searchProducts(allProducts, searchState.value);
          setSearchResult(searchResult);
        })
        .catch((error) => {
          console.error(error);
        });
      if (searchState.amount === "")
        setSearchState({
          isOn: searchState.isOn,
          value: searchState.value,
          amount: "100",
          content: searchState.content,
        });
      if (parseFloat(searchState.amount) > 9999)
        setSearchState({
          isOn: searchState.isOn,
          value: searchState.value,
          amount: "100",
          content: searchState.content,
        });
    }
  }, [dataProduct, searchState.value, searchState.amount]);

  const handleProductAddToList = async (
    productId: string | null,
    amountProduct: string
  ) => {
    let updateAlert: boolean = false;
    dataProduct.forEach((item) => {
      if (item.productID === productId) updateAlert = true;
    });
    if (state.user?.userID && productId && amountProduct) {
      if (updateAlert) {
        const q = query(dbUserProducts, where("productID", "==", productId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            amount: amountProduct,
          });
        });
      } else {
        await addDoc(dbUserProducts, {
          data: formatedData,
          amount: amountProduct,
          userID: state.user?.userID,
          productID: productId,
        });
      }
      setSearchState({
        ...searchState,
        isOn: false,
        value: "",
      });
    } else console.log("Błąd dodawania produktu do listy");
  };

  const handleDeleteProductFromList = async (product: ProductInterface) => {
    const q = query(
      dbUserProducts,
      where("productID", "==", product.productID),
      where("userID", "==", state.user?.userID)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setRerenderState(rerenderState + 1);
  };

  const deleteOld = async () => {
    if (state.user?.userID) {
      await getDocs(dbUserProducts)
        .then((snapshot) => {
          const allUsersProducts = snapshot.docs.map((doc) => {
            const data = doc.data() as UserProductInterface;
            return { ...data, ref: doc.ref };
          });
          const oldUserProducts = allUsersProducts.filter(
            (u) => u.userID === state.user?.userID && u.data !== formatedData
          );
          oldUserProducts.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
          setRerenderState(rerenderState + 1);
        })
        .catch((error) => {
          console.error(error);
        });
    } else console.log("NIE MA STATE.USER");
  };
  useEffect(() => {
    deleteOld();
  }, [state?.user?.userID]);

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
              setSearchState((prev) => ({
                ...prev,
                value: event.target.value,
              }));
            }}
            data={searchState.value}
          />
          <SmallText content={searchState.content} />
          {searchState.isOn ? (
            <SmallText content={"Ilość (g):"} customClassName="amountText" />
          ) : (
            ""
          )}
          {searchState.isOn ? (
            <AppInput
              placeholder="gram"
              customClassName="amountOfProduct"
              type="number"
              onChange={(event) => {
                setSearchState((prev) => ({
                  ...prev,
                  amount: event.target.value,
                }));
              }}
              data={searchState.amount}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <ul className={"List"}>
        {searchState.isOn
          ? searchResult.map((searchProduct) => (
              <ProductAddingPanel
                key={searchProduct.productID}
                product={{
                  ...searchProduct,
                  calories: Math.round(
                    (searchProduct.calories * parseFloat(searchState.amount)) /
                      100
                  ),
                  proteins:
                    Math.round(
                      ((searchProduct.proteins *
                        parseFloat(searchState.amount)) /
                        100) *
                        10
                    ) / 10,
                  fats:
                    Math.round(
                      ((searchProduct.fats * parseFloat(searchState.amount)) /
                        100) *
                        10
                    ) / 10,
                  carbohydrates:
                    Math.round(
                      ((searchProduct.carbohydrates *
                        parseFloat(searchState.amount)) /
                        100) *
                        10
                    ) / 10,
                }}
                amount={parseFloat(searchState.amount)}
                onClick={() =>
                  handleProductAddToList(
                    searchProduct.productID,
                    searchState.amount
                  )
                }
              />
            ))
          : dataProduct.map((product) => (
              <ProductPanel
                key={product.productID}
                product={product}
                onClick={() => handleDeleteProductFromList(product)}
              />
            ))}

        <li className="SaveArea"></li>
      </ul>

      <BottomBar
        calories={totalNutrients.calories}
        proteins={totalNutrients.proteins}
        fats={totalNutrients.fats}
        carbohydrates={totalNutrients.carbohydrates}
      />
      <AppIcon
        src={"./assets/Help.svg"}
        onClick={() => Help()}
        customClassName="HelpButton"
      />
      <Alert />
    </div>
  );
};

export default Main;
