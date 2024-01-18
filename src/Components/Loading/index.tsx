import style from "./Loading.module.scss";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className={style.loadingContainer}>
      <AiOutlineLoading3Quarters className={style.loading} size={30} />
    </div>
  );
}
