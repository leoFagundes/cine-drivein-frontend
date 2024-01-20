import Admin from "../../Components/Admin";
import ButtonPattern from "../../Components/ButtonPattern";
import { useAuth } from "../../Contexts/AuthContext";
import style from "./AdminProfile.module.scss";
import { avatarData } from "./avatarData";
import UserRepositories from "../../Services/repositories/UserRepositories";
import { HiUser } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import ArrowBack from "../../Components/ArrowBack";

export default function AdminProfile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleClick = async (profileImageUpdate: string) => {
    try {
      const updateData = {
        profileImage: profileImageUpdate,
      };

      await UserRepositories.updateUser(user._id, updateData);

      const updatedUser = { ...user, profileImage: profileImageUpdate };
      updateUser(updatedUser);

      console.log("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
    }
  };

  return (
    <Admin sideBar={false}>
      <section className={style.profileContainer}>
        <ArrowBack to="/admin" />
        <div className={style.infoTemplate}>
          <div className={style.userInfo}>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            <p className={style.userAdminText}>
              <i>Usuário Administrador</i>{" "}
              {user.isAdmin ? (
                <FaCheck size={16} color="green" />
              ) : (
                <MdClose size={16} color="red" />
              )}
            </p>
          </div>
          {user.profileImage !== "" ? (
            <img
              className={style.avatarProfileImage}
              src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user.profileImage}`}
              alt="avatar"
            />
          ) : (
            <HiUser className={style.avatarDefaultProfileImage} />
          )}
        </div>
        <div className={style.avatarTemplate}>
          {avatarData.map(({ seed }, index) => (
            <div key={index} className={style.avatarSingle}>
              {seed === "" ? (
                <div
                  onClick={() => handleClick(seed)}
                  className={style.avatarImage}
                >
                  <HiUser size={60} />
                </div>
              ) : (
                <img
                  className={style.avatarImage}
                  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`}
                  alt={"avatar " + seed}
                  onClick={() => handleClick(seed)}
                />
              )}
            </div>
          ))}
        </div>
        {/* <ButtonPattern
                    type='button'
                    mainText='Salvar'
                    onClick={() => console.log('teste')}
                /> */}
      </section>
    </Admin>
  );
}
