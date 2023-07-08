// Import packages
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Importing react icons
import { AiOutlineUser } from 'react-icons/ai';

// Import components
import SpecialButton from '../../components/SpecialButton/SpecialButton';
import InputField from '../../components/InputField/InputField';

// import rtk query
import { useForgotPasswordMutation } from '../../../store/api';

// Import css
import './ForgotPassword.css';

// Defining ForgotPassword Page
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });
  const { email } = formData;

  const [forgotPassword] = useForgotPasswordMutation();

  /**
   * Function to send password reset email to the user on forgot password
   */
  const onForgotPassword = async () => {
    const res = await forgotPassword(formData);
    const response = ('data' in res ? res.data : 'data' in res.error ? res.error.data : null);

    if (response.success) {
      toast.success(`${response.message}`, {
        duration: 3000,
        position: 'bottom-center',
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
        },
      });
      navigate('/signin');
    } else {
      toast.error(`${response.message}`, {
        duration: 3000,
        position: 'bottom-center',
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
        },
      });
    }
  };

  return (
    <div style={{ backgroundImage: 'url(/assets/bg01.jpg)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
      <div
        className="forgotpass-main-container"
      >
        <div
          className="forgotpass-child-container"
        >
          <h3 className="forgotpass-title">Forgot Password:</h3>
          <InputField
            title={'Email Address'}
            id={'email'}
            type={'text'}
            onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}
            value={email}
            placeHolder={'Your Email Address'}
            Icon={AiOutlineUser}
            disabled={false}
          />
          <div style={{ marginTop: '1.875rem' }}>
            <SpecialButton onClick={onForgotPassword} title={'Send Email'} id="forgotPasswordBtn"/>
          </div>
          <div style={{ marginTop: '1.875rem' }}>
            <SpecialButton onClick={() => navigate('/signin')} title={'Sign in Instead'} id="goToSignInBtn"/>
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting page
export default ForgotPassword;
