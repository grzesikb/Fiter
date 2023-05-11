import toast from "react-hot-toast";
import { AppButton } from "../AppButton/AppButton";
import { BigText } from "../BigText/BigText";
import "./Help.css";
import { SmallText } from "../SmallText/SmallText";

const Help = () => {
  toast.custom(
    (t) => (
      <div className={`${t.visible ? "animate-enter" : "animate-leave"}`}>
        <div className="Help">
          <div className="HelpNav">
            <BigText content="Pomoc - Fiter" />
            <AppButton
              textContext="Close"
              onClick={() => toast.dismiss(t.id)}
            />
          </div>
          <div className="HelpContent">
            <SmallText
              content="O aplikacji -"
              customStyles={{ color: "white" }}
            />
            <br />
            <SmallText
              content="Fiter to aplikacja, która pozwala użytkownikom śledzić ich codzienne spożycie, 
              w tym ilość spożytych kalorii, białka, tłuszczu, węglowodanów"
            />
            <br />
            <SmallText
              content="Dodawanie produktów -"
              customStyles={{ color: "white" }}
            />
            <br />
            <SmallText content="Aby dodać produkt należy wpisać nazwę produktu w pole wyszukiwania. Następnie należy wpisać ilość w gramach w pole pod polem wyszukiwania. Aplikacja wylicza automatycznie wartości odżywcze. Aby dodać produkt wystarczy kliknąć na ikonę plusa + " />
            <br />
            <SmallText
              content="Usuwanie produktów -"
              customStyles={{ color: "white" }}
            />
            <br />
            <SmallText content="Aby usunąć produkt z listy wystarczy nacisnąć ikonę minusa dla wybranego produktu." />
            <br />
            <SmallText
              content="Dodawanie produktów do bazy -"
              customStyles={{ color: "white" }}
            />
            <br />
            <SmallText content="Aby dodać produkt nieistniejący w bazie należy kliknąć w ikonę plusa w prawym górnym rogu. Następnie otworzy nam się formularz dodawania produktu należy wypełnić wszystkie dane. Naciśnij przycisk dodaj produkt. Produkt zostanie dodany do bazy. Pamiętaj że twój produkt może zostać usunięty w sytuacji gdy jego dane będą fałszywe." />
          </div>
        </div>
      </div>
    ),
    {
      duration: 60000,
    }
  );
};

export default Help;
