import { useLocation, useNavigate } from "react-router-dom";
import style from "./SingUp.module.scss";
import { BiSolidUserAccount } from "react-icons/bi";
import LogoDrivein from "../../Components/LogoDrivein";
import { ChangeEvent, useEffect, useState } from "react";
import InputPattern from "../../Components/InputPattern";
import ButtonPattern from "../../Components/ButtonPattern";
import UserRepositories from "../../Services/repositories/UserRepositories";
import { User } from "../../Types/types";
import Alert from "../../Components/Alert";

type isValid = {
  username: boolean | null;
  password: boolean | null;
  email: boolean | null;
  adminToken?: boolean | null;
};

export default function SingUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [isValid, setIsValid] = useState<isValid>({
    username: true,
    password: true,
    email: true,
    adminToken: true,
  });
  const [showAlertEmailExist, setShowAlertEmailExist] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeAlert = () => {
    setShowAlertEmailExist(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await UserRepositories.getUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Erro ao buscar a lista de usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    switch (field) {
      case "username":
        setUsername(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "email":
        setEmail(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "password":
        setPassword(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "adminToken":
        setAdminToken(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      default:
        break;
    }
  };

  const isEmailValid = (email: string) => {
    // mesma expressão regular usada no backend
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    setIsValid((prevState) => ({
      ...prevState,
      username: username.trim() !== "" ? true : false,
      password: password.trim() !== "" && password.length >= 4 ? true : false,
      email: email.trim() !== "" && isEmailValid(email) ? true : false,
      adminToken: isAdmin
        ? adminToken.trim() !== "" &&
          adminToken === process.env.REACT_APP_ADMIN_TOKEN
          ? true
          : false
        : true,
    }));

    if (
      username === "" ||
      password === "" ||
      password.length < 4 ||
      email === "" ||
      !isEmailValid(email) ||
      (isAdmin && adminToken === "") ||
      (isAdmin && adminToken !== process.env.REACT_APP_ADMIN_TOKEN)
    ) {
      console.log("Form Inválido");
      return;
    }

    // Verifica se o e-mail já está em uso
    if (allUsers.some((user) => user.email === email)) {
      setShowAlertEmailExist(true);
      setIsValid((prevState) => ({
        ...prevState,
        email: false,
      }));
      return;
    }

    try {
      await UserRepositories.createUser({ username, password, email, isAdmin });
      console.log("Usuário criado com sucesso");
      const queryParams = { from: "userCreated" };
      navigate("/login", { state: queryParams });
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  };

  return (
    <section className={style.signUpContainer}>
      {showAlertEmailExist && (
        <Alert
          mensagem="E-mail já em uso. Escolha outro."
          tempoExibicao={5000}
          onClose={closeAlert}
          type="danger"
        />
      )}
      <form className={style.formSignUp}>
        <LogoDrivein navigateToHome />
        <p className={style.subtitleText}>Cadastrar Usuário</p>
        <InputPattern
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("username", e.target.value)}
          textLabel="Username"
          placeholder="Seu nome"
          type="text"
          isValid={isValid.username}
        />
        <InputPattern
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("email", e.target.value)}
          textLabel="E-mail"
          placeholder="Seu e-mail"
          type="text"
          isValid={isValid.email}
        />
        <InputPattern
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("password", e.target.value)}
          textLabel="Senha"
          placeholder="Sua senha"
          type="password"
          isValid={isValid.password}
        />
        {isAdmin ? (
          <InputPattern
            value={adminToken}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("adminToken", e.target.value)}
            textLabel="Admin Token"
            placeholder="Token de Admninistrador"
            type="password"
            isValid={isValid.adminToken}
          />
        ) : (
          ""
        )}
        <InputPattern
          checked={isAdmin}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target) {
              setIsAdmin(e.target.checked);
            }
          }}
          textLabel="Admin"
          type="checkbox"
          isCheck
        />
        <ButtonPattern
          mainText="Criar Conta"
          type="button"
          onClick={() => handleSubmit()}
        />
        <span onClick={() => navigate("/login")} className={style.loginLink}>
          Fazer login <BiSolidUserAccount size={16} color="#0088c2" />
        </span>
      </form>
    </section>
  );
}
