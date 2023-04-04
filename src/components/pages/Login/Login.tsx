import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { Logo } from "../../atoms/Logo/Logo";
import AuthContext from "../../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (data: { username: string; password: string }) => {
    authContext.login(data.username, data.password);
  };
  useEffect(() => {
    if (authContext.user != null) {
      return navigate("/home");
    }
  }, [authContext]);
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
    </div>
  );
};

export default Login;
