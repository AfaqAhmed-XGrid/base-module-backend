// Import packages
import React, { useState } from 'react';

// Import react icon type
import type { IconType } from 'react-icons';

// Import css
import './InputField.css';
import '../../../App.css';

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

export default function InputField({
  title,
  id,
  type,
  onChange,
  value,
  placeHolder,
  Icon,
  disabled,
}: Props) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="w-full input-margin-top">
      <p className="input-title">{title}</p>
      <div
        className="input-container"
        style={{
          borderBottom: `${
            isFocused ? '0.125rem solid red' : '0.125rem solid #707070'
          }`,
          color: `${isFocused ? '#6F11F5' : '#707070'}`,
        }}
      >
        <Icon className="input-icon-size" />
        <input
          className="input-field"
          type={type}
          id={id}
          value={value ? value : ''}
          onChange={handleOnChange}
          placeholder={placeHolder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
