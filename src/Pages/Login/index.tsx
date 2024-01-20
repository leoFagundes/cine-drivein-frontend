import { ChangeEvent, useEffect, useState } from "react";
import style from "./Login.module.scss";
import UserRepositories from "../../Services/repositories/UserRepositories";
import LogoDrivein from "../../Components/LogoDrivein";
import InputPattern from "../../Components/InputPattern";
import ButtonPattern from "../../Components/ButtonPattern";
import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidUserAccount } from "react-icons/bi";
import Alert from "../../Components/Alert";

type isValid = {
  username: boolean | null;
  password: boolean | null;
};

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlertFromAdmin, setShowAlertFromAdmin] = useState(false);
  const [showAlertFromSignUp, setShowAlertFromSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { from } = location.state || { from: { pathname: "/" } };

  const closeAlert = () => {
    setShowAlertFromAdmin(false);
    setShowAlertFromSignUp(false);
  };

  const [isValid, setIsValid] = useState<isValid>({
    username: true,
    password: true,
  });

  useEffect(() => {
    if (from === "adminInvalid") {
      setShowAlertFromAdmin(true);
      navigate("/login", { replace: true });
    }
    if (from === "userCreated") {
      setShowAlertFromSignUp(true);
      navigate("/login", { replace: true });
    }
  }, []);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    switch (field) {
      case "username":
        setUsername(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "password":
        setPassword(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    const providerReq = await UserRepositories.loginUser({
      username,
      password,
    });

    setIsValid((prevState) => ({
      ...prevState,
      username: username.trim() !== "" ? true : false,
      password: password.trim() !== "" && providerReq ? true : false,
    }));

    if (username === "" || password === "" || !providerReq) {
      console.log("Form Inválido");
      return;
    }

    if (providerReq) {
      console.log("Form Válido", providerReq.user.isAdmin);
      login(providerReq.user);
      const queryParams = { from: "welcome" };
      navigate("/admin", { state: queryParams });
    }
  };

  return (
    <section className={style.loginContainer}>
      {showAlertFromAdmin && (
        <Alert
          mensagem="Faça login para acessar essa página."
          tempoExibicao={5000}
          onClose={closeAlert}
          type="danger"
        />
      )}
      {showAlertFromSignUp && (
        <Alert
          mensagem="Usuário criado com sucesso."
          tempoExibicao={5000}
          onClose={closeAlert}
          type="success"
        />
      )}
      <LogoDrivein navigateToHome />
      <form className={style.formLogin}>
        <p className={style.subtitleText}>Fazer Login</p>
        <InputPattern
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("username", e.target.value)}
          textLabel="Username"
          placeholder="Seu nome"
          type="text"
          isValid={isValid.username}
        />
        <InputPattern
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)}
          textLabel="Senha"
          placeholder="Sua senha"
          type="password"
          isValid={isValid.password}
        />
        <ButtonPattern
          mainText="Entrar"
          type="button"
          onClick={() => handleSubmit()}
        />
        <span onClick={() => navigate("/signUp")} className={style.signUpLink}>
          Criar uma nova conta <BiSolidUserAccount size={16} color="#0088c2" />
        </span>
      </form>
    </section>
  );
}
