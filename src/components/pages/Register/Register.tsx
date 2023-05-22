import { useContext, useState } from "react";
import "./Register.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { Logo } from "../../atoms/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { dbUsers } from "../../../firebaseInit";
import { addDoc, getDocs } from "firebase/firestore";
import { AuthContext } from "../../../auth/auth.context";
import { Alert } from "../../atoms/Alert/Alert";
import { toast } from "react-hot-toast";

const Register = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleRegister = async (data: {
    username: string;
    password: string;
  }) => {
    let id = uuidv4();
    await getDocs(dbUsers)
      .then((snapshot) => {
        const dataa = snapshot.docs.map((doc) => doc.data());
        const userr = dataa.find((u) => u.username === data.username);
        if (userr) {
          toast.error("Nazwa użytkownika jest już zajęta.");
        } else {
          if (data.password === "" || data.username === "")
            toast.error("Pola nie mogą być puste!!");
          else {
            addDoc(dbUsers, {
              userID: id,
              isAdmin: false,
              username: data.username,
              password: data.password,
            });
            toast.success("Pomyślnie utworzono konto");
            setTimeout(() => navigate("/auth/login"), 1000);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setData({ username: "", password: "" });
  };

  if (state.user != null) {
    navigate("/home");
  }

  return (
    <div className={"Register"}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Logo />
        <SmallText content={"REJESTRACJA"} customClassName={"registerText"} />
        <AppInput
          placeholder={"Login"}
          onChange={(event) => {
            setData((prev) => ({ ...prev, username: event.target.value }));
          }}
          data={data.username}
        />
        <AppInput
          placeholder={"Hasło"}
          onChange={(event) => {
            setData((prev) => ({ ...prev, password: event.target.value }));
          }}
          data={data.password}
          type={"password"}
        />
        <AppButton
          textContext={"Utwórz konto"}
          onClick={() => handleRegister(data)}
        />
        <div>
          <SmallText content={"Posiadasz już konto? "} />
          <SmallText content={<Link to="/auth/login">Zaloguj się</Link>} />
        </div>
      </form>
      <Alert />
    </div>
  );
};

export default Register;
