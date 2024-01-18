import { useEffect, useState } from "react";
import style from "./SideBar.module.scss";
import LogoDrivein from "../../LogoDrivein";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import { CgLogOut, CgFeed } from "react-icons/cg";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoMdCreate } from "react-icons/io";

export default function SideBar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isNavBarOpen, setIsNavBarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    // Adiciona o evento de redimensionamento quando o componente monta
    window.addEventListener("resize", handleResize);

    // Remove o evento de redimensionamento quando o componente desmonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleIconClick = () => {
    setIsNavBarOpen(!isNavBarOpen);
  };

  const navBarItems = [
    {
      ico: <IoHome size={20} />,
      name: "Início",
      navigateLink: "/admin",
    },
    {
      ico: <HiClipboardDocumentList size={20} />,
      name: "Pedidos",
      navigateLink: "/admin/orders",
    },
    {
      ico: <CgFeed size={20} />,
      name: "Estoque",
      navigateLink: "/admin/inventory",
    },
    {
      ico: <IoMdCreate size={20} />,
      name: "Cadastro",
      navigateLink: "/admin/registration",
    },
    {
      ico: <FaUsers size={20} />,
      name: "Usuários",
      navigateLink: "/admin/users",
    },
    {
      ico: <CgLogOut size={20} />,
      name: "Sair",
      navigateLink: "/login",
      isLogout: true,
    },
  ];

  if (windowWidth > 768) {
    return (
      <section className={style.sideBarContainer}>
        <LogoDrivein size="200px" navigateToHome />
        <div className={style.navBarItems}>
          {navBarItems.map(({ ico, name, navigateLink, isLogout }, index) => (
            <div
              key={name}
              className={`${style.item} ${location.pathname == navigateLink ? style.currentItem : style.normalItem}`}
              onClick={() => {
                if (navigateLink) {
                  navigate(navigateLink);
                }
                if (isLogout) {
                  logout();
                }
              }}
            >
              <div>{ico}</div>
              <p>{name}</p>
            </div>
          ))}
        </div>
      </section>
    );
  } else {
    return (
      <section className={style.sideBarContainerMobile}>
        <div className={style.wrapper}>
          <div
            onClick={handleIconClick}
            className={`${style.icon} ${style["nav-icon-2"]} ${isNavBarOpen ? style.open : ""}`}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {isNavBarOpen ? (
          <div className={style.navBarItemsMobile}>
            {navBarItems.map(({ ico, name, navigateLink, isLogout }, index) => (
              <div
                key={name}
                className={`${style.itemMobile} ${location.pathname == navigateLink ? style.currentItemMobile : style.normalItemMobile}`}
                onClick={() => {
                  if (navigateLink) {
                    navigate(navigateLink);
                  }
                  if (isLogout) {
                    logout();
                  }
                }}
              >
                <div>{ico}</div>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </section>
    );
  }
}
