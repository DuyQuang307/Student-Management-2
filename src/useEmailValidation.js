import { useState } from 'react';
import { Alert } from 'antd';

const useEmailValidation = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError(<Alert message="Email không đúng định dạng" type="warning" showIcon />);
    } else {
      setEmailError('');
    }
  };

  return {
    email,
    setEmail,
    emailError,
    handleEmailChange,
    handleEmailBlur
  };
};

export default useEmailValidation;
