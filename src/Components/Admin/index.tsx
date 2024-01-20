import { useAuth } from "../../Contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./Admin.module.scss";
import { ReactNode, useEffect, useState } from "react";
import Alert from "../../Components/Alert";
import SideBar from "./SideBar";
import Loading from "../Loading";
import { HiUser } from "react-icons/hi2";
import ButtonPattern from "../ButtonPattern";
import IsAdmin from "../IsAdmin";

type Props = {
  children: ReactNode;
  isAdmin?: boolean;
  sideBar?: boolean;
};

export default function Admin({
  children,
  isAdmin = false,
  sideBar = true,
}: Props) {
  const [showAlertFromLogin, setShowAlertFromLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, user } = useAuth();
  const { from } = location.state || { from: { pathname: "/" } };

  const closeAlert = () => {
    setShowAlertFromLogin(false);
  };

  useEffect(() => {
    const checkAuthentication = async () => {

      if (from === "welcome") {
        setShowAlertFromLogin(true);
        navigate("/admin", { replace: true });
      }

      if (!isLoggedIn) {
        const queryParams = { from: "adminInvalid" };
        navigate("/login", { state: queryParams });
      }

      setLoading(false);
    };

    checkAuthentication();
  }, [isLoggedIn]);

  return (
    <section className={style.adminContainer}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {sideBar ? <SideBar /> : ""}
          <section className={style.bodyContent}>
            {showAlertFromLogin && (
              <Alert
                mensagem={`Bem-vindo(a) ${user.username}!`}
                tempoExibicao={3000}
                onClose={closeAlert}
                type="success"
              />
            )}
            {isAdmin && user.isAdmin === false ? <IsAdmin /> : ""}
            {children}
            <div
              onClick={() => {
                navigate("/admin/profile");
              }}
              className={style.profile}
            >
              {user.profileImage !== "" ? (
                <img
                  className={style.avatarProfileImage}
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.profileImage}`}
                  alt="avatar"
                />
              ) : (
                <HiUser className={style.avatarDefaultProfileImage} size={30} />
              )}
            </div>
          </section>
        </>
      )}
    </section>
  );
}
