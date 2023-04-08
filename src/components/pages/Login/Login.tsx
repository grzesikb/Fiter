import React, { useContext, useState } from "react";
import "./Login.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { Logo } from "../../atoms/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { dbUsers } from "../../../firebaseConfig";
import { AuthContext } from "../../../auth/auth.context";
import { ACTIONS, UserInterface } from "../../../auth/auth.interface";
import toast from "react-hot-toast";
import { Alert } from "../../atoms/Alert/Alert";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { dispatch, state } = useContext(AuthContext);

  const handleLogin = async (data: { username: string; password: string }) => {
    await getDocs(dbUsers)
      .then((snapshot) => {
        const dataa = snapshot.docs.map((doc) => doc.data() as UserInterface);
        const user = dataa.find(
          (u) => u.username === data.username && u.password === data.password
        );
        if (user) {
          dispatch({
            type: ACTIONS.loadUser,
            payload: {
              username: user.username,
              password: user.password,
              userID: user.userID,
              isAdmin: user.isAdmin,
            },
          });
        } else {
          toast.error("Nieprawidłowa nazwa użytkownika lub hasło");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (state.user != null) {
    navigate("/home");
  }

  return (
    <div className={"Login"}>
      <form onSubmit={(event) => event.preventDefault()}>
        <Logo />
        <SmallText content={"LOGOWANIE"} customClassName={"loginText"} />
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
          textContext={"Zaloguj się"}
          onClick={() => handleLogin(data)}
        />
        <div>
          <SmallText content={"Nie masz konta? "} />
          <SmallText
            content={<Link to="/auth/register">Utwórz je teraz</Link>}
            customStyles={{ textDecoration: "none" }}
          />
        </div>
      </form>
      <Alert />
    </div>
  );
};

export default Login;
