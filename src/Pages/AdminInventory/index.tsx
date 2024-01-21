import style from "./AdminInventory.module.scss";
import Admin from "../../Components/Admin";
import { useEffect, useState } from "react";
import ItemRepositories from "../../Services/repositories/ItemRepositories";
import { Item } from "../../Types/types";
import { MdClose, MdDeleteForever } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Alert from "../../Components/Alert";
import DeleteConfirmationModal from "../../Components/DeleteConfirmationModal";

export default function AdminInventory() {
  const [items, setItems] = useState<Item[]>([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);


  useEffect(() => {
    const fetchItems = async () => {
      const itemsFetched = await ItemRepositories.getItems();
      setItems(itemsFetched);
    };

    fetchItems();
  }, [setItems]);

  const closeAlert = () => {
    setShowDeleteAlert(false);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      await ItemRepositories.deleteItem(itemToDelete);

      const updatedItems = items.filter((items) => items._id !== itemToDelete);
      setItems(updatedItems);

      setShowDeleteAlert(true);
      setItemToDelete(null);
      setShowDeleteConfirmation(false);
    }
  };

  const handleVisibleItem = async (id: string, visibleStatus: boolean) => {
    try {
      const updatedItems = items.map(item =>
        item._id === id ? { ...item, isVisible: visibleStatus } : item
      );

      setItems(updatedItems);

      await ItemRepositories.updateItem(id, { isVisible: visibleStatus });
    } catch (error) {
      console.error("Erro ao atualizar a visibilidade do item:", error);
    }
  };

  return (
    <Admin>
      <h2>Estoque</h2>
      <section className={style.inventoryContainer}>
        <div>*Filtros aqui*</div>
        <div className={style.itemsContent}>
          {items.map((item, index) => (
            <div className={`${style.item} ${!item.isVisible ? style.invisibleItem : ''}`} key={index}>
              <img className={style.itemImage} src={process.env.PUBLIC_URL + "/assets/images/EmptyImage.jpg"} alt={`menu item ${item.name}`} />
              <div className={style.itemInfo}>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                <p>Código: {item.cod_item}</p>
                <p>Valor: {item.value}</p>
                <p>Tipo: {item.type}</p>
              </div>
              <div className={style.itemManage}>
                {item.isVisible ? (
                  <FaRegEye
                    size={18}
                    className={style.eyeIco}
                    onClick={() => handleVisibleItem(item._id ? item._id : '', false)}
                  />
                ) : (
                  <FaRegEyeSlash
                    size={18}
                    className={style.eyeIco}
                    onClick={() => handleVisibleItem(item._id ? item._id : '', true)}
                  />
                )}
                <BsPencilSquare
                  size={18}
                  className={style.updateIco}
                />
                <MdDeleteForever
                  size={20}
                  className={style.deleteIco}
                  onClick={() => item._id && handleDeleteClick(item._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      {showDeleteAlert && (
        <Alert
          mensagem="Item excluído com sucesso."
          tempoExibicao={3000}
          onClose={closeAlert}
          type="success"
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          mainText="Tem certeza de que deseja excluir este item?"
        />
      )}
    </Admin>
  )
}
