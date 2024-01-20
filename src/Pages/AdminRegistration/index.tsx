import style from "./AdminRegistration.module.scss";
import Admin from "../../Components/Admin";
import { MdAppRegistration } from "react-icons/md";
import { HiViewGridAdd } from "react-icons/hi";
import { useState } from "react";
import ItemForm from "./ItemForm";
import AdditionalItemForm from "./AdditionalItemForm";
import Alert from "../../Components/Alert";


export default function AdminRegistration() {
  const [registerItem, setRegisterItem] = useState(false)
  const [registerAdditionalItem, setRegisterAdditionalItem] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const closeAlert = () => {
    setShowSuccessAlert(false);
  };

  const handleFormToggle = (item: "registerItem" | "registerAdditionalItem") => {
    setRegisterItem(item === "registerItem" ? !registerItem : false);
    setRegisterAdditionalItem(item === "registerAdditionalItem" ? !registerAdditionalItem : false);
  };

  return (
    <Admin>
      <h2>Cadastro de Item</h2>
      <section className={style.registrationContainer}>
        {showSuccessAlert && (
          <Alert
            mensagem={"Item criado com sucesso!"}
            tempoExibicao={5000}
            onClose={closeAlert}
            type="success"
          />
        )}

        <section className={style.registrationButtonsContent}>

          <div className={`${style.registrationItem} ${registerItem ? style.registrationItemOpen : ''}`} onClick={() => handleFormToggle("registerItem")}>
            <div className={`${style.infoIco} ${registerItem ? style.infoIcoOpen : ''}`}>
              <MdAppRegistration size={40} />
            </div>
            <div className={style.infoCard}>
              <h2>Cadastrar Item</h2>
              <p>Cadastre um item para aparecer no cardápio (o item já poderá ser visto pelos usuários)</p>
            </div>
          </div>

          <div className={`${style.registrationItem} ${registerAdditionalItem ? style.registrationItemOpen : ''}`} onClick={() => handleFormToggle("registerAdditionalItem")}>
            <div className={`${style.infoIco} ${registerAdditionalItem ? style.infoIcoOpen : ''}`}>
              <HiViewGridAdd size={40} />
            </div>
            <div className={style.infoCard}>
              <h2>Cadastrar Item Adicional</h2>
              <p>Cadastre um item adicional que poderá ser vinculado a um item em sua criação</p>
            </div>
          </div>
        </section>

        {registerItem || registerAdditionalItem ? (
          <section className={style.registrationFormContent}>

            {registerItem ? (
              <ItemForm setShowSuccessAlert={setShowSuccessAlert} setRegisterAdditionalItem={setRegisterAdditionalItem} setRegisterItem={setRegisterItem} />
            ) : ''}

            {registerAdditionalItem ? (
              <AdditionalItemForm setShowSuccessAlert={setShowSuccessAlert} setRegisterAdditionalItem={setRegisterAdditionalItem} setRegisterItem={setRegisterItem} />
            ) : ''}

          </section>
        ) : ''}

      </section>
    </Admin>
  )
}
