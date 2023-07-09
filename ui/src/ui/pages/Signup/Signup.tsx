// Import packges
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// Import react icons
import { AiOutlineUser, AiOutlineLock } from 'react-icons/ai';
import { CgNametag } from 'react-icons/cg';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';

// Import components
import SpecialButton from '../../components/SpecialButton/SpecialButton';
import IconButton from '../../components/IconButton/IconButton';
import InputField from '../../components/InputField/InputField';
import PasswordField from '../../components/PasswordField/PasswordField';
import SimpleLink from '../../components/SimpleLink/SimpleLink';

// Import services
import { validateInputField } from '../../../services/formValidation';

// Import rtk query
import { useSignUpUserMutation } from '../../../store/api';

// Import css
import './Signup.css';
import '../../../App.css';

// Defining Signup page
const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    displayName: '',
    password: '',
  });
  const { email, password, displayName } = formData;
  const navigate = useNavigate();
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string | null>(null);

  const [signUpUser] = useSignUpUserMutation();

  /**
   * Function to signup user using email, displayName and password
   */
  const onSignup = async () => {
    const emailError = validateInputField('email', email);
    setEmailErrorMessage(emailError);
    const passwordError = validateInputField('password', password);
    setPasswordErrorMessage(passwordError);
    if (emailError || passwordError) {
      return;
    }
    const res = await signUpUser(formData);
    const response = (
      'data' in res ? res.data : 'data' in res.error ? res.error.data : null
    );

    if (response.success) {
      toast.success(`${response.message}`, {
        duration: 3000,
        position: 'bottom-center',
        ariaProps: {
          'role': 'status',
          'aria-live': 'polite',
        },
      });
      navigate('/dashboard');
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
    <section className="container">
      <div className="form-container">
        <div className='flex-column-center h-full'>
          <img src="/assets/logo.png" alt="" width={150}/>
          <h2 className='form-title'>Create an Account</h2>
        </div>
        <form className='flex-column-between w-full h-full'>
          <div className='w-full'>
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
            <div className={`error-message-container ${emailErrorMessage ? 'visible' : 'hidden'}`}>
              <BiError className="error-message-icon" />
              <p className="error-message">{emailErrorMessage}</p>
            </div>
          </div>
          <InputField
            title={'User Name'}
            id={'displayName'}
            type={'text'}
            onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}
            value={displayName}
            placeHolder={'Your User Name'}
            Icon={CgNametag}
            disabled={false}
          />
          <div className='w-full'>
            <PasswordField
              title={'Password'}
              id={'password'}
              onChange={(e) => setFormData({ ...formData, [e.target.id]: e.target.value })}
              value={password}
              placeHolder={'Your Password'}
              Icon={AiOutlineLock}
              disabled={false}
            />
            <div className={`error-message-container ${passwordErrorMessage ? 'visible' : 'hidden'}`}>
              <BiError className="error-message-icon" />
              <p className="error-message">{passwordErrorMessage}</p>
            </div>
          </div>
          <div className='flex-row-between'>
            <SimpleLink link={'/signin'} title={'Already a member? Signin!'} color='blue' />
            <SimpleLink link={'/forgotpassword'} title={'Forgot Password?'} color='red'/>
          </div>
          <div className='w-full'>
            <SpecialButton
              onClick={onSignup}
              title={'Sign up'}
              id="signUpBtn"
            />
          </div>
        </form>
        <div className='w-full h-full'>
          <div>
            <p className="signup-para">Or</p>
          </div>
          <div className='flex-row-between'>
            <IconButton
              id="googleSignUpBtn"
              title='google'
              Icon={FcGoogle}
              color={'#922724'}
              borderColor="#922724"
              onClick={() =>
                (window.location.href = 'http://localhost:4000/api/auth/google')
              }
            />
            <IconButton
              id="githubSignUpBtn"
              title='github'
              Icon={FaGithub}
              color={'black'}
              borderColor="black"
              onClick={() =>
                (window.location.href = 'http://localhost:4000/api/auth/github')
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// Exporting page
export default Signup;
