// Import packages
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Import react icons
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";

// Import components
import SpecialButton from "../SpecialButton/SpecialButton";
import InputField from "../InputField/InputField";
import PasswordField from "../PasswordField/PasswordField";

// Import rtk queries
import {
  useUpdateUserDataMutation,
  useChangePasswordMutation,
  useLogoutUserMutation,
} from "../../../store/api";

// Import css
import "./ProfileBar.css";

const ProfileBar = ({ user }: { user: any }) => {
  const [userFormData, setUserFormData] = useState(user);
  const [passwordformData, setPasswordFormData] = useState({
    password: "",
    newPassword: "",
  });
  const { password, newPassword } = passwordformData;
  const [showChangePassword, setshowChangePassword] = useState<boolean>(false);
  const { email, displayName } = userFormData;
  const [editProfile, setEditProfile] = useState(true);
  const navigate = useNavigate();

  const [updateUserData] = useUpdateUserDataMutation();
  const [changePassword] = useChangePasswordMutation();
  const [logoutUser] = useLogoutUserMutation();

  const onUpdateData = async () => {
    const res = await updateUserData(userFormData);
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
      setEditProfile(true);
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

  const onChangePassword = async () => {
    const res = await changePassword(passwordformData);
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

  const onLogout = async () => {
    const res = await logoutUser(null);
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
      navigate("/signin");
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
    <div className="profile-main-container">
      <div className="profile-child-container">
        <div className="profile-box">
          {!showChangePassword ? (
            <div>
              <h3 className="profile-title">User Profile Data</h3>
              <InputField
                title={"Email Address"}
                id={"email"}
                type={"text"}
                setData={setUserFormData}
                value={email}
                placeHolder={"Your Email Address"}
                Icon={AiOutlineUser}
                data={userFormData}
                disabled={editProfile}
              />
              <InputField
                title={"User Name"}
                id={"displayName"}
                type={"text"}
                setData={setUserFormData}
                value={displayName}
                placeHolder={"User Name"}
                Icon={AiOutlineLock}
                data={userFormData}
                disabled={editProfile}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginRight: "0.313rem",
                }}
              >
                <p
                  style={{ color: "red" }}
                  className="profile-simple-link"
                  onClick={() => setEditProfile(!editProfile)}
                >
                  Edit Profile
                </p>
                <p
                  style={{ color: "blue" }}
                  className="profile-simple-link"
                  onClick={() => setshowChangePassword(!showChangePassword)}
                >
                  Change Password
                </p>
              </div>
              <div style={{ marginTop: "1.875rem" }}>
                <SpecialButton
                  onClick={onUpdateData}
                  title={"Update Changes"}
                  id="updateProfileBtn"
                />
              </div>
              <div style={{ marginTop: "1.875rem" }}>
                <SpecialButton
                  onClick={onLogout}
                  title={"Logout"}
                  id="logoutBtn"
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="profile-title">Change Password</h2>
              <PasswordField
                title={"Old Password"}
                id={"password"}
                setData={setPasswordFormData}
                value={password}
                placeHolder={"Your old password"}
                Icon={AiOutlineUser}
                data={passwordformData}
                disabled={false}
              />
              <PasswordField
                title={"New Password"}
                id={"newPassword"}
                setData={setPasswordFormData}
                value={newPassword}
                placeHolder={"Your new password"}
                Icon={AiOutlineUser}
                data={passwordformData}
                disabled={false}
              />
              <div style={{ marginTop: "1.875rem" }}>
                <SpecialButton
                  onClick={onChangePassword}
                  title={"Change Password"}
                  id="changePasswordBtn"
                />
              </div>
              <div style={{ marginTop: "1.875rem" }}>
                <SpecialButton
                  onClick={onLogout}
                  title={"Logout"}
                  id="logoutBtn"
                />
              </div>
              <p
                style={{
                  color: "gray",
                  fontSize: "0.8rem",
                  textAlign: "justify",
                }}
              >
                Note: If you created account by using google or github, you
                cannot change/set password
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
