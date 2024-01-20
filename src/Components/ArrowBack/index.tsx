import { useNavigate } from 'react-router-dom';
import style from './ArrowBack.module.scss'
import { FaArrowLeft } from "react-icons/fa";

export default function ArrowBack({ to }: { to: string }) {
  const navigate = useNavigate();

  return (
    <FaArrowLeft
      size={20}
      className={style.arrowBack}
      onClick={() => navigate(to)}
    />
  )
}
