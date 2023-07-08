// Import packages
import React, { useState } from 'react';

// Import react icon type
import type { IconType } from 'react-icons';

// Import icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// Import css
import './PasswordField.css';
import '../../../App.css';

// Defining prop type
type Props = {
  title: string;
  id: string;
  value: string;
  placeHolder: string;
  Icon: IconType;
  disabled: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
};

export default function PasswordField({ title, id, value, placeHolder, Icon, onChange, disabled }: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="w-full password-margin-top">
      <p className="password-input-title">{title}</p>
      <div className='position-relative'>
        <div
          className="input-constainer"
          style={{
            borderBottom: `${isFocused ? '0.125rem solid red' : '0.125rem solid #707070'}`, color: `${isFocused ? '#6F11F5': '#707070'}`,
          }}
        >
          <Icon className='input-icon-size' />
          <input
            className="input-field"
            type={showPassword ? 'text' : 'password'}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeHolder}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
          />
        </div>
        <button className='toggle-password-btn' onClick={() => setShowPassword(!showPassword)} type='button'>
          {showPassword ? <AiOutlineEyeInvisible className='password-eye'/> : <AiOutlineEye className='password-eye'/>}
        </button>
      </div>
    </div>
  );
}
