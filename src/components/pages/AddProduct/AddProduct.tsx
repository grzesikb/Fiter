import React, { useState } from "react";
import "./AddProduct.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { AppIcon } from "../../atoms/AppIcon/AppIcon";
import { useNavigate } from "react-router";
import { dbProducts } from "../../../firebaseInit";
import { addDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { Alert } from "../../atoms/Alert/Alert";
import toast from "react-hot-toast";
const AddProduct = () => {
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = useState({
    name: "",
    calories: "",
    proteins: "",
    fats: "",
    carbohydrates: "",
    productID: "",
  });

  const handleAddProduct = async (dataProduct: {
    name: string;
    calories: string;
    proteins: string;
    fats: string;
    carbohydrates: string;
    productID: string;
  }) => {
    if (
      dataProduct.name !== "" &&
      dataProduct.calories !== "" &&
      dataProduct.proteins !== "" &&
      dataProduct.fats !== "" &&
      dataProduct.carbohydrates !== ""
    ) {
      if (
        Number(dataProduct.calories) >= 0 &&
        Number(dataProduct.proteins) >= 0 &&
        Number(dataProduct.fats) >= 0 &&
        Number(dataProduct.carbohydrates) >= 0
      ) {
        await addDoc(dbProducts, {
          name: dataProduct.name,
          calories: Number(dataProduct.calories),
          proteins: Number(dataProduct.proteins),
          fats: Number(dataProduct.fats),
          carbohydrates: Number(dataProduct.carbohydrates),
          productID: uuidv4(),
        }).catch((error) => {
          console.error(error);
        });
        toast.success("Dodano produkt do bazy");
        setTimeout(() => navigate("/home"), 1000);
      } else {
        toast.error("Wartości składników odżywczych nie mogą być ujemne!!");
      }
    } else {
      toast.error("Wypełnij wszystkie pola!!");
    }
  };

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <div className={"AddProduct"}>
        <div className="NavBarAdd">
          <AppIcon
            src={"./assets/Back.svg"}
            onClick={() => navigate("/home")}
          />
          <div>
            <SmallText content="Dodawanie nowego produktu" />
          </div>
        </div>
        <div className="AddContent">
          <AppInput
            placeholder="Nazwa Produktu"
            onChange={(event) => {
              setDataProduct((prev) => ({ ...prev, name: event.target.value }));
            }}
            data={dataProduct.name}
          />
          <div>
            <SmallText
              content="W 100 gramach produktu"
              customStyles={{ color: "#fff" }}
            />
          </div>
          <div className="AddGrid">
            <AppInput
              placeholder="Kalorie"
              onChange={(event) => {
                setDataProduct((prev) => ({
                  ...prev,
                  calories: event.target.value,
                }));
              }}
              data={dataProduct.calories}
              type="number"
            />
            <AppInput
              placeholder="Białko"
              onChange={(event) => {
                setDataProduct((prev) => ({
                  ...prev,
                  proteins: event.target.value,
                }));
              }}
              data={dataProduct.proteins}
              type="number"
            />
            <AppInput
              placeholder="Tłuszcz"
              onChange={(event) => {
                setDataProduct((prev) => ({
                  ...prev,
                  fats: event.target.value,
                }));
              }}
              data={dataProduct.fats}
              type="number"
            />
            <AppInput
              placeholder="Węglowodany"
              onChange={(event) => {
                setDataProduct((prev) => ({
                  ...prev,
                  carbohydrates: event.target.value,
                }));
              }}
              data={dataProduct.carbohydrates}
              type="number"
            />
          </div>
          <AppButton
            textContext="Dodaj Produkt"
            onClick={() => {
              handleAddProduct(dataProduct);
            }}
          />
        </div>
      </div>
      <Alert />
    </form>
  );
};

export default AddProduct;
