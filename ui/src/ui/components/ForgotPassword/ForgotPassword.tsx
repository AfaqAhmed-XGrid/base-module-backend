// Import packages
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Importing react icons
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai';

// Import components
import Button from '../Button/Button';
import InputField from '../InputField/InputField';

// import rtk query
import { useForgotPasswordMutation } from '../../../store/api';

// Import css
import './ForgotPassword.css';

// Defining ForgotPassword Page
const ForgotPassword = ({ setisModalOpen }: {setisModalOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
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
        duration: 3000, // Toast duration is set to 3s
        position: 'bottom-center',
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
        },
      });
      navigate('/signin');
    } else {
      toast.error(`${response.message}`, {
        duration: 3000, // Toast duration is set to 3s
        position: 'bottom-center',
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
        },
      });
    }
  };

  return (
    <div className='forget-password-main-container forget-password-position-absolute'>
      <div className='forget-password-modal-container'>
        <div>
          <AiOutlineClose onClick={() => setisModalOpen(false)} className='forget-password-close-button' />
        </div>
        <h2 className='signin-title'>Enter Your Email</h2>
        <InputField
          title='Email Address'
          id='email'
          type='email'
          onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}
          value={email}
          placeHolder='Your Email Address'
          Icon={AiOutlineUser}
          disabled={false}
        />
        <div className='w-full'>
          <Button
            onClick={onForgotPassword}
            title='Send Email'
            id="forgotPasswordBtn"
          />
        </div>
      </div>
    </div>
  );
};

// Exporting page
export default ForgotPassword;
