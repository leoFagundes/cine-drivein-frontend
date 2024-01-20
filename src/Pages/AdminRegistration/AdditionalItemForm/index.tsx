// AdditionalItemForm.jsx
import React, { ChangeEvent, useState } from "react";
import InputPattern from "../../../Components/InputPattern";
import ButtonPattern from "../../../Components/ButtonPattern";
import style from './AdditionalItemForm.module.scss'
import { AdditionalItem } from "../../../Types/types";
import AdditionalItemRepositories from "../../../Services/repositories/AdditionalItemRepositories";

type isValid = {
  name: boolean | null;
  description: boolean | null;
  photo: boolean | null;
};

type Props = {
  setShowSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterAdditionalItem: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterItem: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AdditionalItemForm({ setShowSuccessAlert, setRegisterAdditionalItem, setRegisterItem }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [isValid, setIsValid] = useState<isValid>({
    name: true,
    description: true,
    photo: true,
  });

  const handleInputChange = (field: string, value: string | number | boolean | []) => {
    switch (field) {
      case "name":
        setName(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "description":
        setDescription(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "photo":
        setPhoto(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async () => {
    setIsValid((prevState) => ({
      ...prevState,
      name: name.trim() !== "" ? true : false,
      description: description.trim() !== "" ? true : false,
      photo: photo.trim() !== "" ? true : false,
    }));

    // Validando cada campo individualmente
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      photo.trim() === ""
    ) {
      console.log("Form Inválido");
      return;
    }

    const newItem: AdditionalItem = {
      name,
      description,
      photo,
    };

    const createdItem = await AdditionalItemRepositories.createAdditionalItem(newItem);

    if (createdItem) {
      console.log("Item criado com sucesso");
      setShowSuccessAlert(true);
      setRegisterItem(false)
      setRegisterAdditionalItem(false)
    } else {
      console.log("Erro ao criar item");
    }

  };

  return (
    <form className={style.formRegister}>
      <InputPattern
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
        textLabel="Nome do Item Adicional"
        placeholder="Ex: Queijo extra"
        type="text"
        isValid={isValid.name}
      />
      <InputPattern
        value={description}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("description", e.target.value)}
        textLabel="Descrição"
        placeholder="Ex: Adicione queijo extra ao seu pedido"
        type="text"
        isValid={isValid.description}
      />
      <InputPattern
        value={photo}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("photo", e.target.value)}
        textLabel="URL da Foto"
        placeholder="Ex: https://example.com/queijo-extra.jpg"
        type="text"
        isValid={isValid.photo}
      />
      <ButtonPattern
        mainText="Criar Item Adicional"
        type="button"
        onClick={handleSubmit}
      />
    </form>
  );
}
