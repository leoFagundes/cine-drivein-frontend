import { useNavigate } from 'react-router-dom';
import style from './LogoDrivein.module.scss'

type Props = {
    size?: string
    navigateToHome?: boolean
}

export default function LogoDrivein({ size, navigateToHome = false }: Props) {
    const navigate = useNavigate();

    return <img
        style={{ height: size ? size : '' }}
        className={`${style.logoImage} ${navigateToHome ? style.isLink : ''}`}
        src={process.env.PUBLIC_URL + "/assets/images/logo-drivein.svg"}
        alt="Logo Cine Drive-in"
        onClick={() => {
            if (navigateToHome) {
                navigate('/')
            }
        }}
        title={navigateToHome ? 'Ir para o início' : ''}
    />
}
