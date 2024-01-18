import style from './InfoSpot.module.scss'

export default function InfoSpot() {
    return (
        <section className={style.infoSpotContainer}>
            <h3>Como acho minha vaga?</h3>
            <p>São <strong>3 ou 4 dígitos</strong> que ficam localizados na <strong>lateral esquerda</strong> de cada vaga</p>
            <p><i>{'>'}Adicionar imagem aqui{'<'}</i></p>
        </section>
    )
}
