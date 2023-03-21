import React from "react";
import "./Login.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { Logo } from "../../atoms/Logo/Logo";
const Login = () => {
  return (
    <div className="Login">
      <form>
        <Logo />
        <SmallText content="LOGOWANIE" customClassName="loginText" />
        <AppInput placeholder="Login" />
        <AppInput placeholder="Hasło" />
        <AppButton textContext={"Zaloguj się"} />
        <div>
          <SmallText content="Nie masz konta? " />
          <SmallText content="Utwórz je teraz " />
        </div>
      </form>
    </div>
  );
};

export default Login;
