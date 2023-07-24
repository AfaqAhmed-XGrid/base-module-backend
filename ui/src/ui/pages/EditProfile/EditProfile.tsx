// Import Packages
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import showToast from '../../components/showToast';
import Button from '../../components/Button/Button';

// Import services
import { validateInputField } from '../../../services/formValidation';

// Import react icons
import { BiError } from 'react-icons/bi';

// Import constants
import constants from '../../../app.constants';

// Import rtk query
import {
  useCheckAuthStatusMutation,
  useUpdateUserDataMutation,
} from '../../../store/api';

// Import css
import './EditProfile.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [showEmailInput, setShowEmailInput] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(
      null
  );
  const [displayNameErrorMessage, setDisplayNameErrorMessage] = useState<
    string | null
  >(null);
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
  });

  const { email, displayName } = formData;

  const [checkAuthStatus] = useCheckAuthStatusMutation();
  const [updateUserData] = useUpdateUserDataMutation();

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await checkAuthStatus(null);
      const response =
        'data' in res ? res.data : 'data' in res.error ? res.error.data : null;
      if (response.success) {
        console.log(response);
        if (response.data.githubId || response.data.googleId) {
          setShowEmailInput(false);
        }
        setFormData(response.data);
        showToast({ message: `${response.message}`, type: 'success' });
      } else {
        showToast({ message: `${response.message}`, type: 'error' });
      }
    };
    fetchUserData();
    console.log('useEffect');
  }, [checkAuthStatus]);

  /**
   * Function to handle change in input feild value
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * Function to update user profile in db
   * @return {Promise<void>}
   */
  const onUpdateProfile = async () => {
    const emailError = validateInputField('email', email);
    setEmailErrorMessage(emailError);
    const displayNameError = validateInputField('displayName', displayName);
    setDisplayNameErrorMessage(displayNameError);
    if (emailError || displayNameError) {
      return;
    }
    const res = await updateUserData(formData);
    const response =
      'data' in res ? res.data : 'data' in res.error ? res.error.data : null;
    if (response.success) {
      showToast({ message: `${response.message}`, type: 'success' });
      navigate(constants.pagelinks.editProfile);
    } else {
      showToast({ message: `${response.message}`, type: 'error' });
      navigate(constants.pagelinks.editProfile);
    }
  };
  return (
    <div className="edit-profile-main-container">
      <p className="edit-profile-title">Edit Your Profile</p>
      <form className='edit-profile-form-container'>
        {showEmailInput && (
          <>
            <p className="edit-profile-input-title">Your Email Address:</p>
            <input
              type="email"
              className="edit-profile-input-field"
              id="email"
              value={email}
              placeholder="Your email address"
              onChange={onChange}
            />
            <div
              className={`error-message-container ${
              emailErrorMessage ? 'visible' : 'hidden'
              }`}
            >
              <BiError className="error-message-icon" />
              <p className="error-message">{emailErrorMessage}</p>
            </div>
          </>
        )}
        <p className="edit-profile-input-title">Your Display Name:</p>
        <input
          type="text"
          className="edit-profile-input-field"
          id="displayName"
          value={displayName}
          placeholder="Your full name"
          onChange={onChange}
        />
        <div
          className={`error-message-container ${
          displayNameErrorMessage ? 'visible' : 'hidden'
          }`}
        >
          <BiError className="error-message-icon" />
          <p className="error-message">{displayNameErrorMessage}</p>
        </div>
        <div className="edit-profile-button-container">
          <Button
            title="Update Profile"
            onClick={onUpdateProfile}
            id="updateProfileBtn"
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
