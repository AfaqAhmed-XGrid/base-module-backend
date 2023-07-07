// Import packages
import React from "react";
import { Link } from "react-router-dom";

// Import react icon type
import type { IconType } from "react-icons";

// Import css
import './SignButton.css'

// Defining prop type
type Props = {
  link: string;
  title: string;
  Icon?: IconType;
  active: boolean;
};

const SignButton = ({ link, title, Icon, active }: Props) => {
  return (
    <div>
      <Link to={link} style={{ textDecoration: "none" }}>
        <button className="sign-button"
          style={{
            backgroundColor: `${active ? "#6F11F5" : "white"}`,
            boxShadow: `${
              active
                ? "rgba(0, 0, 0, 0.1) 0px 4px 12px"
                : "rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
            }`,
          }}
        >
          {Icon && ( <Icon style={{ color: `${active ? "white" : "#6F11F5"}` }} className="sign-button-icon" /> )}
          <p className="sign-button-title" style={{ color: `${active ? "white" : "#6F11F5"}` }}>
            {title}
          </p>
        </button>
      </Link>
    </div>
  );
};

export default SignButton;
