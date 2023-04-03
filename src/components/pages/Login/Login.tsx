import React, { useContext, useState } from "react";
import "./Login.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { Logo } from "../../atoms/Logo/Logo";
import AuthContext from "../../../context/AuthContext";
//import AuthContext2 from "../../../context/AuthContext2";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const authContext = useContext(AuthContext);

  const handleLogin = async (data: { username: string; password: string }) => {
    // console.log(data.username + " " + data.password);
    authContext.login(data.username, data.password);
  };

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
    </div>
  );
};

export default Login;
