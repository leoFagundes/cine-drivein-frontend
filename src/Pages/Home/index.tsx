import { ChangeEvent, useEffect, useState } from "react";
import InputPattern from "../../Components/InputPattern";
import style from "./Home.module.scss";
import ButtonPattern from "../../Components/ButtonPattern";
import { IoLogoWhatsapp } from "react-icons/io";
import InfoSpot from "../../Components/InfoSpot";
import ScheduleRepositories from "../../Services/repositories/ScheduleRepositories";
import LogoDrivein from "../../Components/LogoDrivein";

type isValid = {
  name: boolean | null;
  phone: boolean | null;
  spot: boolean | null;
};

export default function Home() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [spot, setSpot] = useState("");
  const [isValid, setIsValid] = useState<isValid>({
    name: true,
    phone: true,
    spot: true,
  });
  const [isOpen, setIsOpen] = useState<boolean>();
  const [closingTime, setClosingTime] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closeImageName, setCloseImageName] = useState("Harley");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ScheduleRepositories.getSchedule();

        setIsOpen(data.isOpen);
        setClosingTime(data.closingTime);
        setOpeningTime(data.openingTime);
      } catch (error) {
        console.error(
          "Erro ao obter dados do horário de funcionamento:",
          error,
        );
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field: string, value: string | number | boolean) => {
    switch (field) {
      case "name":
        setName(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "phone":
        setPhone(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "spot":
        setSpot(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    setIsValid((prevState) => ({
      ...prevState,
      name: name.trim() !== "" ? true : false,
      phone: phone.trim() !== "" ? true : false,
      spot: spot.trim().length === 3 || spot.trim().length === 4 ? true : false,
    }));

    if (
      name === "" ||
      phone === "" ||
      (spot.trim().length !== 3 && spot.trim().length !== 4)
    ) {
      console.log("Form Inválido");
      return;
    }

    console.log("Form Válido");
  };

  const openWhatsApp = () => {
    const formattedNumber = "+55 (61) 99961-9114";
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${formattedNumber}`;
    window.open(whatsappUrl, "_blank");
  };

  const generateRandomName = () => {
    const length = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomName = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomName += characters.charAt(randomIndex);
    }

    return randomName;
  };

  if (!isOpen) {
    return (
      <section className={style.homeContainer}>
        <div className={style.isClose}>
          <LogoDrivein />
          <div className={style.infoSchedule}>
            <h3>Estamos Fechados</h3>
            <p>Horário de Funcionamento da Lanchonete:</p>
            <p>
              de <strong>{openingTime}</strong> até{" "}
              <strong>{closingTime}</strong>
            </p>
          </div>
          <img
            onClick={() => setCloseImageName(generateRandomName())}
            src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${closeImageName}`}
            alt="avatar"
            className={style.infoCloseImage}
          />
          <span onClick={openWhatsApp} className={style.helpLink}>
            Precisa de Ajuda? <IoLogoWhatsapp size={16} color="green" />
          </span>
        </div>
      </section>
    );
  } else {
    return (
      <section className={style.homeContainer}>
        <form className={style.formContainer}>
          <LogoDrivein />
          <p className={style.subtitleText}>
            Para fazer seu pedido, preencha os campos abaixo
          </p>
          <InputPattern
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
            textLabel="Nome"
            placeholder="Ex: Leonardo"
            type="text"
            isValid={isValid.name}
          />
          <InputPattern
            value={phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("phone", e.target.value)}
            textLabel="Telefone"
            placeholder="Ex: (61) 99825-3228"
            type="text"
            isValid={isValid.phone}
            isPhone
          />
          <div>
            <InputPattern
              value={spot}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("spot", e.target.value)}
              textLabel="Vaga"
              placeholder="Ex: 203"
              type="number"
              isValid={isValid.spot}
              isModal
              modalComponent={<InfoSpot />}
            />
          </div>
          <ButtonPattern
            mainText="Ir para o cardápio"
            type="button"
            onClick={() => handleSubmit()}
          />
          <span onClick={openWhatsApp} className={style.helpLink}>
            Precisa de Ajuda? <IoLogoWhatsapp size={16} color="green" />
          </span>
        </form>
      </section>
    );
  }
}
