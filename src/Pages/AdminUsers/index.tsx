import { useEffect, useState } from "react";
import Admin from "../../Components/Admin";
import style from "./AdminUsers.module.scss";
import UserRepositories from "../../Services/repositories/UserRepositories";
import { User } from "../../Types/types";
import { useAuth } from "../../Contexts/AuthContext";
import { HiUser } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import { MdClose, MdDeleteForever } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import DeleteConfirmationModal from "../../Components/DeleteConfirmationModal";
import Alert from "../../Components/Alert";

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const closeAlert = () => {
    setShowDeleteAlert(false);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const usersFetched = await UserRepositories.getUsers();
      setUsers(usersFetched);
    };

    fetchUsers();
  }, [setUsers]);

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setUserToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      await UserRepositories.deleteUser(userToDelete);

      const updatedUsers = users.filter((user) => user._id !== userToDelete);
      setUsers(updatedUsers);

      setShowDeleteAlert(true);
      setUserToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  return (
    <Admin isAdmin>
      {showDeleteAlert && (
        <Alert
          mensagem="Usuário excluído com sucesso."
          tempoExibicao={3000}
          onClose={closeAlert}
          type="success"
        />
      )}
      <h2>Usuários</h2>
      <section className={style.usersContainer}>
        {users.map(
          ({ _id, username, password, email, isAdmin, profileImage }) => (
            <div key={username} className={style.user}>
              <div className={style.userInfo}>
                {profileImage !== "" ? (
                  <img
                    className={style.avatarProfileImage}
                    src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${profileImage}`}
                    alt="avatar"
                  />
                ) : (
                  <HiUser className={style.avatarProfileImage} />
                )}
                <div>
                  <h3>{username}</h3>
                  <p>{email}</p>
                  <p className={style.userAdminText}>
                    <i>Usuário Administrador</i>{" "}
                    {isAdmin ? (
                      <FaCheck size={16} color="green" />
                    ) : (
                      <MdClose size={16} color="red" />
                    )}
                  </p>
                </div>
              </div>
              <div className={style.userManage}>
                <BsPencilSquare size={21} className={style.updateUser} />
                <MdDeleteForever
                  size={25}
                  className={style.deleteUser}
                  onClick={() => _id && handleDeleteClick(_id)}
                />
              </div>
            </div>
          ),
        )}
      </section>
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          mainText="Tem certeza de que deseja excluir este usuário?"
        />
      )}
    </Admin>
  );
}
