// Import packages
import React from 'react';
import { Link } from 'react-router-dom';

// Import css
import './SimpleLink.css';

// Defining type
type Props = {
    link: string;
    title: string;
    color: string;
  };

const SimpleLink = ({ link, title, color }: Props) => {
  return (
    <div>
      <Link to={link} style={{ color: `${color}` }} className='simple-link-text-decoration'>
        <p className='simple-link-title'>{title}</p>
      </Link>
    </div>
  );
};

export default SimpleLink;
