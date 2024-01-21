import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';
import InputPattern from '../../../Components/InputPattern'
import style from './ItemForm.module.scss'
import ButtonPattern from '../../../Components/ButtonPattern';
import { AdditionalItem, Item } from '../../../Types/types';
import InputDropDownPattern from './InputDropDownPattern';
import AdditionalItemRepositories from '../../../Services/repositories/AdditionalItemRepositories';
import ItemRepositories from '../../../Services/repositories/ItemRepositories';
import Alert from '../../../Components/Alert';

type isValid = {
  cod_item: boolean | null;
  name: boolean | null;
  type: boolean | null;
  description: boolean | null;
  value: boolean | null;
  quantity: boolean | null;
  photo: boolean | null;
  additionals: boolean | null;
  additionals_sauces: boolean | null;
  additionals_drinks: boolean | null;
  additionals_sweets: boolean | null;
};

type Props = {
  setShowSuccessAlert: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterAdditionalItem: React.Dispatch<React.SetStateAction<boolean>>
  setRegisterItem: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ItemForm({ setShowSuccessAlert, setRegisterAdditionalItem, setRegisterItem }: Props) {
  const [cod_item, setCodItem] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photo, setPhoto] = useState('');

  const [additionals, setAdditionals] = useState<AdditionalItem[]>([]);

  const [additionalsItems, setAdditionalItems] = useState<string[]>([]);
  const [additionalsSauces, setAdditionalsSauces] = useState<string[]>([]);
  const [additionalsDrinks, setAdditionalsDrinks] = useState<string[]>([]);
  const [additionalsSweets, setAdditionalsSweets] = useState<string[]>([]);

  const [selectedAdditionals, setSelectedAdditionals] = useState(false)
  const [selectedAdditionalsSauces, setSelectedAdditionalsSauces] = useState(false)
  const [selectedAdditionalsDrinks, setSelectedAdditionalsDrinks] = useState(false)
  const [selectedAdditionalsSweets, setSelectedAdditionalsSweets] = useState(false)

  const [isValid, setIsValid] = useState<isValid>({
    cod_item: true,
    name: true,
    type: true,
    description: true,
    value: true,

    quantity: true,
    photo: true,
    // isVisible: boolean,
    additionals: true,
    additionals_sauces: true,
    additionals_drinks: true,
    additionals_sweets: true,
  });
  const [showAlertCodItemExist, setShowAlertCodItemExist] = useState(false);

  const closeAlert = () => {
    setShowAlertCodItemExist(false);
  };

  const handleInputChange = (field: string, value: string | number | boolean | []) => {
    switch (field) {
      case "cod_item":
        setCodItem(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "name":
        setName(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "type":
        setType(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "description":
        setDescription(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "value":
        setValue(value as string);
        setIsValid((prevIsValid) => ({ ...prevIsValid, [field]: value !== "" ? true : null }));
        break;
      case "quantity":
        setQuantity(value as string);
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

  useEffect(() => {
    fetchAdditionalItems();
  }, []);

  const fetchAdditionalItems = async () => {
    try {
      const additionalItems = await AdditionalItemRepositories.getAdditionalItems();
      setAdditionals(additionalItems);
    } catch (error) {
      console.error('Erro ao obter itens adicionais:', error);
    }
  };

  useEffect(() => {
    setAdditionalItems(selectedAdditionals ? additionalsItems : [])
    setAdditionalsSauces(selectedAdditionalsSauces ? additionalsSauces : [])
    setAdditionalsDrinks(selectedAdditionalsDrinks ? additionalsDrinks : [])
    setAdditionalsSweets(selectedAdditionalsSweets ? additionalsSweets : [])

  }, [selectedAdditionals, selectedAdditionalsSauces, selectedAdditionalsDrinks, selectedAdditionalsSweets])


  const handleSubmit = async () => {
    setIsValid((prevState) => ({
      ...prevState,
      cod_item: cod_item.trim() !== "" ? true : false,
      name: name.trim() !== "" ? true : false,
      type: type.trim() !== "" ? true : false,
      description: description.trim() !== "" ? true : false,
      value: value.trim() !== "" ? true : false,
      quantity: quantity.trim() !== "" ? true : false,
      photo: photo.trim() !== "" ? true : false,
    }));

    // Validando cada campo individualmente
    if (
      cod_item.trim() === "" ||
      name.trim() === "" ||
      type.trim() === "" ||
      description.trim() === "" ||
      value.trim() === "" ||
      quantity.trim() === "" ||
      photo.trim() === ""
    ) {
      console.log("Form Inválido");
      return;
    }

    // Verifica se o 'cod_item' já existe
    const allItems = await ItemRepositories.getItems()
    if (allItems.some((item: Item) => item.cod_item === cod_item)) {
      setShowAlertCodItemExist(true);
      setIsValid((prevState) => ({
        ...prevState,
        cod_item: false,
      }));
      return;
    }

    // Formatar listas de additionals
    const formattedAdditionals = additionalsItems.map((id) => ({ additionalItem: id }));
    const formattedSauces = additionalsSauces.map((id) => ({ additionalItem: id }));
    const formattedDrinks = additionalsDrinks.map((id) => ({ additionalItem: id }));
    const formattedSweets = additionalsSweets.map((id) => ({ additionalItem: id }));

    // Criar novo item
    const newItem: Item = {
      cod_item,
      name,
      type,
      description,
      value: parseFloat(value),
      quantity: parseInt(quantity, 10),
      photo,
      isVisible: true,
      additionals: formattedAdditionals,
      additionals_sauces: formattedSauces,
      additionals_drinks: formattedDrinks,
      additionals_sweets: formattedSweets,
    };

    const createdItem = await ItemRepositories.createItem(newItem);

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
      {showAlertCodItemExist && (
        <Alert
          mensagem="Código do Item já em uso. Escolha outro."
          tempoExibicao={5000}
          onClose={closeAlert}
          type="danger"
        />
      )}
      <div className={style.groupFormContainer}>
        <div className={style.groupForm}>
          <InputPattern
            value={cod_item}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("cod_item", e.target.value)}
            textLabel="Código do Item"
            placeholder="Ex: ABC123"
            type="text"
            isValid={isValid.cod_item}
          />
          <InputPattern
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("name", e.target.value)}
            textLabel="Nome do Item"
            placeholder="Ex: Hambúrguer"
            type="text"
            isValid={isValid.name}
          />
          <InputPattern
            value={type}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("type", e.target.value)}
            textLabel="Tipo do Item"
            placeholder="Ex: Principal"
            type="text"
            isValid={isValid.type}
          />
          <InputPattern
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("description", e.target.value)}
            textLabel="Descrição"
            placeholder="Ex: Delicioso hambúrguer com queijo"
            type="text"
            isValid={isValid.description}
          />
          <InputPattern
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("value", e.target.value)}
            textLabel="Valor"
            placeholder="Ex: 12.99"
            type="number"
            isValid={isValid.value}
          />
        </div>
        <div className={style.groupForm}>
          <InputPattern
            value={quantity}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("quantity", e.target.value)}
            textLabel="Quantidade"
            placeholder="Ex: 2"
            type="number"
            isValid={isValid.quantity}
          />
          <InputPattern
            value={photo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleInputChange("photo", e.target.value)}
            textLabel="URL da Foto"
            placeholder="Ex: https://example.com/hamburger.jpg"
            type="text"
            isValid={isValid.photo}
          />

          <section className={style.additionalChecks}>

            <div className={selectedAdditionals ? style.checkedContent : ''}>
              <InputPattern
                checked={selectedAdditionals}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target) {
                    setSelectedAdditionals(e.target.checked);
                  }
                }}
                textLabel="Itens Adicionais"
                type="checkbox"
                isCheck
              />
              {selectedAdditionals ? (
                <InputDropDownPattern
                  mainText="Itens Adicionais"
                  options={additionals.map((item: AdditionalItem) => ({ _id: item._id, name: item.name, photo: item.photo, description: item.description }))}
                  onSelect={(selectedValue: string[]) => { }}
                  selectedOptions={additionalsItems}
                  setSelectedOptions={setAdditionalItems}
                />
              ) : ''}
            </div>

            <div className={selectedAdditionalsSauces ? style.checkedContent : ''}>
              <InputPattern
                checked={selectedAdditionalsSauces}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target) {
                    setSelectedAdditionalsSauces(e.target.checked);
                  }
                }}
                textLabel="Itens Adicionais - Molhos"
                type="checkbox"
                isCheck
              />
              {selectedAdditionalsSauces ? (
                <InputDropDownPattern
                  mainText="Itens Adicionais - Molhos"
                  options={additionals.map((item: AdditionalItem) => ({ _id: item._id, name: item.name, photo: item.photo, description: item.description }))}
                  onSelect={(selectedValue: string[]) => { }}
                  selectedOptions={additionalsSauces}
                  setSelectedOptions={setAdditionalsSauces}
                />
              ) : ''}
            </div>

            <div className={selectedAdditionalsDrinks ? style.checkedContent : ''}>
              <InputPattern
                checked={selectedAdditionalsDrinks}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target) {
                    setSelectedAdditionalsDrinks(e.target.checked);
                  }
                }}
                textLabel="Itens Adicionais - Bebidas"
                type="checkbox"
                isCheck
              />
              {selectedAdditionalsDrinks ? (
                <InputDropDownPattern
                  mainText="Itens Adicionais - Bebidas"
                  options={additionals.map((item: AdditionalItem) => ({ _id: item._id, name: item.name, photo: item.photo, description: item.description }))}
                  onSelect={(selectedValue: string[]) => { }}
                  selectedOptions={additionalsDrinks}
                  setSelectedOptions={setAdditionalsDrinks}
                />
              ) : ''}
            </div>

            <div className={selectedAdditionalsSweets ? style.checkedContent : ''}>
              <InputPattern
                checked={selectedAdditionalsSweets}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target) {
                    setSelectedAdditionalsSweets(e.target.checked);
                  }
                }}
                textLabel="Itens Adicionais - Sobremesas"
                type="checkbox"
                isCheck
              />
              {selectedAdditionalsSweets ? (
                <InputDropDownPattern
                  mainText="Itens Adicionais - Sobremesas"
                  options={additionals.map((item: AdditionalItem) => ({ _id: item._id, name: item.name, photo: item.photo, description: item.description }))}
                  onSelect={(selectedValue: string[]) => { }}
                  selectedOptions={additionalsSweets}
                  setSelectedOptions={setAdditionalsSweets}
                />
              ) : ''}
            </div>

          </section>
        </div>
      </div>
      <ButtonPattern
        mainText="Criar Item"
        type="button"
        onClick={handleSubmit}
      />
    </form>
  )
}
