import { check } from 'prettier';
import React, { ChangeEvent, FC, useState } from 'react';
import './FoldersGroup.scss';

type Props = {
  items: {
    id: string;
    name: string;
  }[];
  defaultSelected: string[];
};

const FoldersGroup: FC<Props> = ({ items, defaultSelected }) => {
  const [values, setValues] = useState(defaultSelected || []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target as HTMLInputElement;
    if (checked) {
      setValues((prev) => [...prev, value]);
    } else {
      setValues((prev) => prev.filter((id) => id !== value));
    }
  };

  return (
    <div className="AddToFolderModal-folders">
      {items.map((item) => {
        return (
          <div className="AddToFolderModal-folder" key={item.id}>
            <input
              type="checkbox"
              value={item.id}
              checked={values.includes(item.id)}
              onChange={handleChange}
            />
            <label>{item.name}</label>
          </div>
        );
      })}
    </div>
  );
};

export default FoldersGroup;
