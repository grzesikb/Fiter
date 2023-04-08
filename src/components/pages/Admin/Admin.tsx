import { useContext, useEffect, useState } from "react";
import "./Admin.css";
import { Search } from "../../atoms/Search/Search";
import { Logo } from "../../atoms/Logo/Logo";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
import { ProductPanel } from "../../molecules/ProductPanel/ProductPanel";
import { useNavigate } from "react-router";
import { dbProducts, dbUserProducts } from "../../../firebaseConfig";
import { getDocs } from "@firebase/firestore";
import { AuthContext } from "../../../auth/auth.context";
import Fuse from "fuse.js";
import { deleteDoc, query, where } from "firebase/firestore";

export interface ProductInterface {
  productID: string | null;
  name: string;
  amount: number;
  calories: number;
  proteins: number;
  fats: number;
  carbohydrates: number;
}

const Admin = () => {
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = useState<ProductInterface[]>([]);

  const [searchState, setSearchState] = useState({
    isOn: false,
    value: "",
    amount: "",
    content: "Twój dzisiejszy dzień",
  });

  const [searchResult, setSearchResult] = useState<ProductInterface[]>([]);

  const [rerenderState, setRerenderState] = useState<number>(0);

  useEffect(() => {
    getDocs(dbProducts)
      .then((snapshot) => {
        const allProducts = snapshot.docs.map(
          (doc) => doc.data() as ProductInterface
        );

        let product: any[] = [];

        allProducts.forEach((item) => {
          product.push({
            ...item,
            amount: 100,
          });
        });
        if (product) setDataProduct(product);
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
    //SEARCH
    const today: Date = new Date();
    const day: string = today.getDate().toString().padStart(2, "0");
    const month: string = (today.getMonth() + 1).toString().padStart(2, "0");
    const year: string = today.getFullYear().toString().substr(-2);
    if (searchState.value === "") {
      setSearchState({
        isOn: false,
        value: searchState.value,
        amount: "100",
        content: `Twój dzień - ${day}.${month}.${year}`,
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

  const handleDeleteProductFromDatabase = async (product: ProductInterface) => {
    const q = query(
      dbUserProducts,
      where("productID", "==", product.productID)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    setRerenderState(rerenderState + 1);
  };

  return (
    <div className={"Main"}>
      <div className={"NavbarSpace"}>
        <div className={"Navbar"}>
          <Logo edit={"Admin"} />
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
        </div>
      </div>
      <ul className={"List"}>
        {dataProduct.map((product) => (
          <ProductPanel
            key={product.productID}
            product={product}
            onClick={() => handleDeleteProductFromDatabase(product)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Admin;
