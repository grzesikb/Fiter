import React from "react";
import "./Register.css";
import { AppButton } from "../../atoms/AppButton/AppButton";
import { SmallText } from "../../atoms/SmallText/SmallText";
import { AppInput } from "../../atoms/AppInput/AppInput";
import { Logo } from "../../atoms/Logo/Logo";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className={"Register"}>
      <form>
        <Logo />
        <SmallText content={"REJESTRACJA"} customClassName={"registerText"} />
        <AppInput placeholder={"Login"} />
        <AppInput placeholder={"Hasło"} />
        <AppButton textContext={"Utwórz konto"} />
        <div>
          <SmallText content={"Posiadasz już konto? "} />
          <SmallText content={<Link to="/auth/login">Zaloguj się</Link>} />
        </div>
      </form>
    </div>
  );
};

export default Register;
