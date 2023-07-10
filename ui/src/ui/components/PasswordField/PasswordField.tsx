// Import packages
import React, { useState } from 'react';

// Import react icon type
import type { IconType } from 'react-icons';

// Import component
import InputField from '../InputField/InputField';

// Import icons
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

// Import css
import './PasswordField.css';

// Defining prop type
type Props = {
  title: string;
  id: string;
  value: string;
  placeHolder: string;
  Icon: IconType;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PasswordField = ({
  title,
  id,
  value,
  placeHolder,
  Icon,
  onChange,
  disabled,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full password-margin-top">
      <div className="position-relative">
        <InputField
          title={title}
          id={id}
          type={showPassword ? 'text' : 'password'}
          value={value}
          placeHolder={placeHolder}
          Icon={Icon}
          disabled={disabled}
          onChange={onChange}
        />
        <button
          className="toggle-password-btn"
          onClick={() => setShowPassword(!showPassword)}
          type="button"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="password-eye" />
          ) : (
            <AiOutlineEye className="password-eye" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;
