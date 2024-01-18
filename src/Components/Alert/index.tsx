import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import style from './Alert.module.scss'

type Props = {
    mensagem: string
    tempoExibicao: number
    onClose: () => void
    type: 'success' | 'danger'
}

export default function Alert({ mensagem, tempoExibicao, onClose, type }: Props) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
            onClose();
        }, tempoExibicao);

        return () => clearTimeout(timeout);
    }, [tempoExibicao, onClose]);

    return show ? (
        <div className={`${style.alert} ${type === 'success' ? style.success : style.danger}`}>
            <p>{mensagem}</p>
            <AiOutlineClose className={style.closeIco} size={20} onClick={() => setShow(false)} />
        </div>
    ) : null;
};