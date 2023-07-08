// Import packges
import React from 'react';

// Import react icon type
import type { IconType } from 'react-icons';

// Import css
import './IconButton.css';

// Defining prop type
type Props = {
    Icon: IconType,
    color: string,
    onClick: () => void,
    id: string,
    borderColor: string,
    title?: string
}

// Defining IconButton component
const IconButton = ({ Icon, color, onClick, id, title }: Props) => {
  return (
    <button id={id} className='iconButton-container' style={{ border: `${title ? '1px solid #D3D3D3': 'none'}`,
      borderRadius: `${title ? '0.2rem': '0'}` }} onClick={(e) => {
      e.preventDefault(); onClick();
    }}>
      <Icon style={{ color: `${color}` }} className='icon'/>
      {title && <p className='icon-button-title'>{title}</p>}
    </button>
  );
};

// Exporting IconButton
export default IconButton;
