// Import packages
import React from "react";
import { Link } from "react-router-dom";

// Defining type
type Props = {
    link: string;
    title: string;
  };

const SimpleLink = ({link, title}: Props) => {
  return (
    <div>
      <Link to={link} style={{textDecorationLine: 'none',}}>
        <p style={{fontSize: '0.9rem'}}>{title}</p>
      </Link>
    </div>
  );
};

export default SimpleLink;
