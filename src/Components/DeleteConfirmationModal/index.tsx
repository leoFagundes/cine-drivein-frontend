import style from './DeleteConfirmationModal.module.scss'

type Props = {
    onCancel: () => void;
    onConfirm: () => void;
    mainText: string
}

export default function DeleteConfirmationModal({ onCancel, onConfirm, mainText }: Props) {
    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <p>{mainText}</p>
                <div className={style.modalButtons}>
                    <button onClick={onCancel}>Cancelar</button>
                    <button onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}
