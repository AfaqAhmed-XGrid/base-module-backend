// Import packages
import React from 'react';

// Import css
import './SpecialButton.css';

// Defining type
type Props = {
  onClick: () => void;
  title: string;
  id: string
};

const SpecialButton = ({ onClick, title, id }: Props) => {
  return (
    <div>
      <button
        id={id}
        className="btn"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        {title}
      </button>
    </div>
  );
};

export default SpecialButton;
