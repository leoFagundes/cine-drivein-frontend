import { useNavigate } from "react-router-dom";
import ButtonPattern from "../ButtonPattern";
import style from "./IsAdmin.module.scss";

export default function IsAdmin() {
  const navigate = useNavigate();

  return (
    <div className={style.onlyAdmin}>
      <div>
        <h2>Apenas Administradores podem ver essa página</h2>
        <ButtonPattern
          mainText="Voltar"
          type="button"
          onClick={() => {
            navigate("/admin");
          }}
        />
      </div>
    </div>
  );
}
