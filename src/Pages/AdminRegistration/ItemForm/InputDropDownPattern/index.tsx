import React, { useState, ChangeEvent, Dispatch, SetStateAction, useEffect } from 'react';
import { AdditionalItem } from '../../../../Types/types';
import style from './InputDropDownPattern.module.scss';
import AdditionalItemRepositories from '../../../../Services/repositories/AdditionalItemRepositories';
import { IoIosCloseCircle } from "react-icons/io";

interface DropdownProps {
  mainText: string;
  options: AdditionalItem[];
  onSelect: (selectedValues: string[]) => void;
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
}

const InputDropDownPattern: React.FC<DropdownProps> = ({ mainText, options, onSelect, selectedOptions, setSelectedOptions }) => {
  const [selectedItems, setSelectedItems] = useState<AdditionalItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchSelectedItems = async () => {
      const itemsPromises = selectedOptions.map(async (id) => {
        const itemData = await AdditionalItemRepositories.getAdditionalItemById(id);
        return itemData;
      });

      const items = await Promise.all(itemsPromises);
      setSelectedItems(items);
    };

    fetchSelectedItems();
  }, [selectedOptions]);

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    if (!selectedOptions.includes(selectedValue)) {
      const updatedOptions = [...selectedOptions, selectedValue];
      setSelectedOptions(updatedOptions);
      onSelect(updatedOptions);
    }
  };

  const handleRemoveOption = (value: string) => {
    const updatedOptions = selectedOptions.filter((option) => option !== value);
    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={style.dropDownContainer}>
      <label>{mainText}</label>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={style.inputSearch}
      />
      <select id="dropdown" value="" onChange={handleDropdownChange} multiple>
        {filteredOptions.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>

      {selectedItems.length > 0 && (
        <div className={style.choiceValues}>
          <p>Itens escolhidos:</p>
          <div className={style.values}>
            {selectedItems.map((item) => (
              <div key={item._id}>
                <p>{item.name}</p>
                <IoIosCloseCircle size={20} onClick={() => handleRemoveOption(item._id as string)} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InputDropDownPattern;
