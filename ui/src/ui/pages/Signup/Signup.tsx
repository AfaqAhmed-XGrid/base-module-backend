// Import packges
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Import types
import { AppDispatch } from "../../../store/types";

// Import auth slice
import { setAuthenticated, setUnauthenticated } from "../../../store/authSlice";

// Import react icons
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { HiUser, HiUserAdd } from "react-icons/hi";
import { CgNametag } from "react-icons/cg";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

// Import components
import SignButton from "../../components/SimpleButton/SignButton";
import SpecialButton from "../../components/SpecialButton/SpecialButton";
import IconButton from "../../components/IconButton/IconButton";
import InputField from "../../components/InputField/InputField";
import PasswordField from "../../components/PasswordField/PasswordField";

// Import rtk query
import { useSignUpUserMutation } from "../../../store/api";

// Import css
import "./Signup.css";

// Defining Signup page
const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    displayName: "",
    password: "",
  });
  const { email, password, displayName } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [signUpUser] = useSignUpUserMutation();

  const onSignup = async () => {
    const res = await signUpUser(formData);
    const response = (
      "data" in res ? res.data : "data" in res.error ? res.error.data : null
    ) as any;

    if (response.success) {
      dispatch(setAuthenticated());
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
      dispatch(setUnauthenticated());
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
      <div className="signup-main-container">
        <div className="signup-child-container">
          <div className="signup-box">
            <SignButton
              link={"/signin"}
              title={"Sign in"}
              Icon={HiUser}
              active={false}
            />
            <SignButton
              link={"/signup"}
              title={"Sign up"}
              Icon={HiUserAdd}
              active={true}
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
          <InputField
            title={"User Name"}
            id={"displayName"}
            type={"text"}
            setData={setFormData}
            value={displayName}
            placeHolder={"Your User Name"}
            Icon={CgNametag}
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
          <div style={{ marginTop: "1.875rem" }}>
            <SpecialButton
              onClick={onSignup}
              title={"Sign up"}
              id="signUpBtn"
            />
          </div>
          <p className="signup-para">Or Continue with Social Media</p>
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
              id="googleSignUpBtn"
              Icon={FcGoogle}
              color={"#922724"}
              borderColor="#922724"
              onClick={() =>
                (window.location.href = "http://localhost:4000/api/auth/google")
              }
            />
            <IconButton
              id="githubSignUpBtn"
              Icon={FaGithub}
              color={"black"}
              borderColor="black"
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
export default Signup;
