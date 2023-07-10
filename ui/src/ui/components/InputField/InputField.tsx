// Import packages
import React from 'react';

// Import react icon type
import type { IconType } from 'react-icons';

// Import css
import './InputField.css';

// Defining prop type
type Props = {
  title: string;
  id: string;
  type: string;
  value?: string;
  placeHolder: string;
  Icon: IconType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
};

const InputField = ({
  title,
  id,
  type,
  onChange,
  value,
  placeHolder,
  Icon,
  disabled,
}: Props) => {
  /**
   * Function to handle change in input field value
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="w-full input-margin-top">
      <p className="input-title">{title}</p>
      <div className="input-container" >
        <Icon className="input-icon-size" />
        <input
          className="input-field"
          type={type}
          id={id}
          value={value ? value : ''}
          onChange={handleOnChange}
          placeholder={placeHolder}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default InputField;
