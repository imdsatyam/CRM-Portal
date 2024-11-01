import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Logo from './assets/CRM_Logo.svg';
import Banner from './assets/loginBanner.svg';

function Login({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [lastName, setLastName] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isCreateAccount, setIsCreateAccount] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const savedUserData = JSON.parse(localStorage.getItem("userData"));
      if (savedUserData && !isCreateAccount && !isForgotPassword) {
        setUsername(savedUserData.username);
        setPassword(savedUserData.password);
      }
    }, [isCreateAccount, isForgotPassword]);
  
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };
  
    const handleLogin = () => {
        const savedUserData = JSON.parse(localStorage.getItem("userData"));
        const defaultUsername = "mypara@mailinator.com";
        const defaultPassword = "Password@123";
      if ((savedUserData && savedUserData.username === username && savedUserData.password === password) || (defaultUsername && defaultPassword)) {
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        alert('Invalid username or password.');
      }
    };
  
    const saveUserDataToLocalStorage = () => {
      const userData = {
        username,
        password,
        firstName,
        lastName,
        secondName,
        repeatPassword
      };
      localStorage.setItem("userData", JSON.stringify(userData));
    };
  
    const handleCreateAccount = () => {
      if (username && password && firstName && lastName && repeatPassword && password === repeatPassword) {
        saveUserDataToLocalStorage();
        alert('Account created successfully!');
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else if (password !== repeatPassword) {
        alert('Passwords do not match.');
      } else {
        alert('Please fill out all fields to create an account.');
      }
    };
  
    const handleForgotPassword = () => {
      const savedUserData = JSON.parse(localStorage.getItem("userData"));
      if (savedUserData && savedUserData.username === username) {
        alert('Password reset instructions have been sent to your email.');
        setIsForgotPassword(false);
      } else {
        alert('Email not found. Please enter the correct email.');
      }
    };

  return (
    <div className='LoginMain d-flex align-items-center justify-content-center'>
      <Row className='LoginMainBanner d-flex justify-content-between'>
        <Col className='loginLeft p-3 pt-0'>
          <Row className='loginLogo'>
            <img src={Logo} alt="CRM Logo" className='logo' />
          </Row>
          <Row className='loginBanner m-3 mt-2 w-100'>
            <img src={Banner} alt='Login Banner' className='Banner' />
          </Row>
        </Col>
        <Col className='loginRight p-3'>
          <Row>
            <p className='fw-bold headingWelcome'>
                {isForgotPassword ? 'Forgot Password' : isCreateAccount ? 'Welcome :)' : 'Welcome Back :)'}
            </p>
          </Row>
          <Row>
            <p className='loginInfo'>
              {isForgotPassword
                ? 'Please enter your email to reset your password.'
                : isCreateAccount
                ? 'Please enter your information to create an account.'
                : 'To keep connected with us please login with your personal information.'}
                <span>&#x1F514;</span>
            </p>
          </Row>

          {isForgotPassword ? (
            <Row className='m-3 mt-0 ms-0 UsernameField'>
              <div className='inputContainer ps-0'>
                <i className="fas fa-envelope inputIcon"></i>
                <input
                  type="text"
                  placeholder="Email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </Row>
          ) : (
            <>
              {isCreateAccount && (
                <>
                  <Row className='m-3 mt-0 ms-0 nameField'>
                    <div className='inputContainer ps-0'>
                      <i className="fas fa-user inputIcon"></i>
                      <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                  </Row>
                  <Row className='m-3 mt-0 ms-0 nameField'>
                    <div className='inputContainer ps-0'>
                      <i className="fas fa-user inputIcon"></i>
                      <input type="text" placeholder="Second Name" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
                    </div>
                  </Row>
                  <Row className='m-3 mt-0 ms-0 nameField'>
                    <div className='inputContainer ps-0'>
                      <i className="fas fa-user inputIcon"></i>
                      <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                  </Row>
                </>
              )}
              
              <Row className='m-3 mt-0 ms-0 UsernameField'>
                <div className='inputContainer ps-0'>
                  <i className="fas fa-envelope inputIcon"></i>
                  <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
              </Row>

              <Row className='m-3 mt-0 ms-0 PasswordField'>
                <div className='inputContainer ps-0'>
                  <i className="fas fa-lock inputIcon"></i>
                  <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <i
                    className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'} toggleIcon inputIconBack`}
                    onClick={togglePasswordVisibility}
                  ></i>
                </div>
              </Row>

              {isCreateAccount && (
                <Row className='m-3 mt-0 ms-0 PasswordField'>
                  <div className='inputContainer ps-0'>
                    <i className="fas fa-lock inputIcon"></i>
                    <input
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Repeat Password"
                      value={repeatPassword}
                      onChange={(e) => setRepeatPassword(e.target.value)}
                    />
                  </div>
                </Row>
              )}
            </>
          )}
          
          {!isForgotPassword && (
            <Row className='m-3 mt-0 ms-0'>
              <Col className="text-start d-flex align-items-center ps-1">
                <input type="checkbox" id="rememberMe" className="me-2 w-auto" />
                <label htmlFor="rememberMe" className="m-0 loginForgotInfo">Remember me!</label>
              </Col>
              <Col className="text-end">
                <p
                  className='loginForgotInfo m-0'
                  style={{ cursor: 'pointer', color: '#0D6EFD' }}
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot password?
                </p>
              </Col>
            </Row>
          )}
          
          <Row className='m-3 mt-0 ms-0'>
            <Col className='text-start ps-1'>
              <button onClick={isForgotPassword ? handleForgotPassword : isCreateAccount ? handleCreateAccount : handleLogin}>
                {isForgotPassword ? 'Send Reset Link' : isCreateAccount ? 'Create Account' : 'Login'}
              </button>
            </Col>
            <Col className='text-end'>
              {!isForgotPassword && (
                <button onClick={() => setIsCreateAccount(!isCreateAccount)}>
                  {isCreateAccount ? 'Go to Login' : 'Create Account'}
                </button>
              )}
              {isForgotPassword && (
                <button onClick={() => setIsForgotPassword(false)}>
                  Back to Login
                </button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Login;

export function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
}
