import { ChangeEvent, ReactNode, useEffect, useState } from "react"
import style from "./InputPattern.module.scss"
import InputMask from "react-input-mask";
import { LuBadgeInfo } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


type Props = {
    textLabel: string
    placeholder?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value?: string
    checked?: boolean
    type: string
    isValid?: boolean | null
    isPhone?: boolean
    isModal?: boolean
    modalComponent?: ReactNode;
    isCheck?: boolean
}


export default function InputPattern({ textLabel, placeholder, onChange, value, checked, type, isValid, isPhone = false, isModal = false, modalComponent, isCheck }: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [inputType, setInputType] = useState(type);
    const [passwordEye, setPasswordEye] = useState(true)

    const handleModalClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget === e.target) {
            handleCloseModal();
        }
    };

    const handlePasswordEye = () => {
        setPasswordEye(!passwordEye)

    }

    useEffect(() => {
        if (textLabel == 'Senha' || textLabel == 'Admin Token') {
            if (passwordEye !== true) {
                setInputType('text')
            } else {
                setInputType('password')
            }
        }
    }, [passwordEye])

    if (isPhone) {
        return (
            <section className={style.inputContainer}>
                <label>
                    {textLabel}
                    {isModal ? <LuBadgeInfo className={style.infoIco} size={20} onClick={handleModalClick} /> : ''}
                    {type == 'password' ? (passwordEye ? (<FaRegEyeSlash className={style.eyeIco} onClick={handlePasswordEye} />) : (<FaRegEye className={style.eyeIco} onClick={handlePasswordEye} />)) : ''}
                </label>
                <InputMask mask="(99) 99999-9999" className={isValid || isValid === null ? '' : style.invalidInput} id={textLabel} type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
                {isValid || isValid === null ? '' : <span className={style.invalidMessage} role="alert">Campo inválido</span>}
                {isModal && modalComponent && modalOpen && (
                    <div className={style.modalOverlay} onClick={handleOverlayClick}>
                        <div className={style.modal}>
                            <button onClick={handleCloseModal} className={style.closeButton}>
                                <IoClose size={20} />
                            </button>
                            {modalComponent}
                        </div>
                    </div>
                )}
            </section>
        )
    } else if (isCheck) {
        return (
            <section className={`${style.inputCheckContainer}`}>
                <label>
                    {textLabel}
                    {isModal ? <LuBadgeInfo className={style.infoIco} size={20} onClick={handleModalClick} /> : ''}
                    {type == 'password' ? (passwordEye ? (<FaRegEyeSlash className={style.eyeIco} onClick={handlePasswordEye} />) : (<FaRegEye className={style.eyeIco} onClick={handlePasswordEye} />)) : ''}
                </label>
                <input id={textLabel} type={'checkbox'} checked={checked} onChange={onChange} placeholder={placeholder} />
                {isModal && modalComponent && modalOpen && (
                    <div onClick={handleOverlayClick} className={style.modalOverlay}>
                        <div className={style.modal}>
                            <button onClick={handleCloseModal} className={style.closeButton}>
                                <IoClose size={20} />
                            </button>
                            {modalComponent}
                        </div>
                    </div>
                )}
            </section>
        )
    } else {
        return (
            <section className={style.inputContainer}>
                <label>
                    {textLabel}
                    {isModal ? <LuBadgeInfo className={style.infoIco} size={20} onClick={handleModalClick} /> : ''}
                    {type == 'password' ? (passwordEye ? (<FaRegEyeSlash className={style.eyeIco} onClick={handlePasswordEye} />) : (<FaRegEye className={style.eyeIco} onClick={handlePasswordEye} />)) : ''}
                </label>
                <input className={isValid || isValid === null ? '' : style.invalidInput} id={textLabel} type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
                {isValid || isValid === null ? '' : <span className={style.invalidMessage} role="alert">Campo inválido</span>}
                {isModal && modalComponent && modalOpen && (
                    <div onClick={handleOverlayClick} className={style.modalOverlay}>
                        <div className={style.modal}>
                            <button onClick={handleCloseModal} className={style.closeButton}>
                                <IoClose size={20} />
                            </button>
                            {modalComponent}
                        </div>
                    </div>
                )}
            </section>
        )
    }
}
