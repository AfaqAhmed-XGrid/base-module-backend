// Import packages
import React, { useState } from "react";

// Import react icon type
import type { IconType } from "react-icons";

// Import icons
import { BiShow, BiHide } from 'react-icons/bi'

// Import component
import IconButton from "../IconButton/IconButton";

// Import css
import './PasswordField.css'

// Defining prop type
type Props = {
  title: string;
  id: string;
  value: string;
  setData: React.Dispatch<React.SetStateAction<any>>;
  placeHolder: string;
  Icon: IconType;
  data: any,
  disabled: boolean
};

export default function PasswordField({ title, id,setData, value, placeHolder, Icon, data, disabled}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const passwordIcon = showPassword ? BiHide : BiShow

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="input-main-container">
      <p className="input-title">{title}</p>
      <div style={{position: 'relative'}}>
      <div
      className="input-box"
        style={{
          borderBottom: `${isFocused ? "0.125rem solid red" : "0.125rem solid #707070"}`, color: `${isFocused ? '#6F11F5': '#707070'}`
        }}
      >
        <Icon style={{ fontSize: "1.3rem" }} />
        <input
          className="input-field"
          type={showPassword ? 'text' : 'password'}
          id={id}
          value={value}
          onChange={(e) => setData({...data, [e.target.id]: e.target.value})}
          placeholder={placeHolder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
        />
      </div>
      <div style={{position: 'absolute', top: '0', bottom: '0', right: '0.5rem'}}>
      <IconButton
              id="googleSignInBtn"
              Icon={passwordIcon}
              color={"black"}
              borderColor={"transparent"}
              onClick={() => setShowPassword(!showPassword)
              }
            />
      </div>
      </div>
    </div>
  );
}
