// Import packges
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Import react icons
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { HiUser, HiUserAdd } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Import components
import SignButton from "../../components/SimpleButton/SignButton";
import SimpleLink from "../../components/SimpleLink/SimpleLink";
import SpecialButton from "../../components/SpecialButton/SpecialButton";
import IconButton from "../../components/IconButton/IconButton";
import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/PasswordField/PasswordField";

// Import rtk query
import { useSignInUserMutation } from "../../../store/api";

// Import css
import "./Signin.css";

// Defining Signin page
const Signin = () => {
  const [formData, setFormData] = useState({
    email: ""
    password: "",
  });
  const { email, password } = formData;
  const navigate = useNavigate();

  const [signInUser] = useSignInUserMutation();
  
  const onSignIn = async () => {
    const res = await signInUser(formData);
    const response = (
      "data" in res ? res.data : "data" in res.error ? res.error.data : null
    ) as any;

    if (response.success) {
      toast.success(`${response.message}`, {
        duration: 3000,
        position: "bottom-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
      navigate("/dashboard");
    } else {
      toast.error(`${response.message}`, {
        duration: 3000,
        position: "bottom-center",
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/assets/bg01.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center top",
      }}
    >
      <div className="signin-main-container">
        <div className="signin-child-container">
          <div className="signin-box">
            <SignButton
              link={"/signin"}
              title={"Sign in"}
              Icon={HiUser}
              active={true}
            />
            <SignButton
              link={"/signup"}
              title={"Sign up"}
              Icon={HiUserAdd}
              active={false}
            />
          </div>
          <InputField
            title={"Email Address"}
            id={"email"}
            type={"text"}
            setData={setFormData}
            value={email}
            placeHolder={"Your Email Address"}
            Icon={AiOutlineUser}
            data={formData}
            disabled={false}
          />
          <PasswordField
            title={"Password"}
            id={"password"}
            setData={setFormData}
            value={password}
            placeHolder={"Your Password"}
            Icon={AiOutlineLock}
            data={formData}
            disabled={false}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "0.313rem",
            }}
          >
            <SimpleLink link={"/forgotpassword"} title={"Forgot Password?"} />
          </div>
          <div style={{ marginTop: "1.875rem" }}>
            <SpecialButton
              onClick={onSignIn}
              title={"Sign In"}
              id="signInBtn"
            />
          </div>
          <p className="signin-para">
            Dont have an account? Please sign up!
            <br /> OR <br /> use your google/github account
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "1.25rem",
              gap: "3rem",
            }}
          >
            <IconButton
              id="googleSignInBtn"
              Icon={FcGoogle}
              color={"#922724"}
              borderColor={"#922724"}
              onClick={() =>
                (window.location.href = "http://localhost:4000/api/auth/google")
              }
            />
            <IconButton
              id="githubSignInBtn"
              Icon={FaGithub}
              color={"black"}
              borderColor={"black"}
              onClick={() =>
                (window.location.href = "http://localhost:4000/api/auth/github")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting page
export default Signin;
