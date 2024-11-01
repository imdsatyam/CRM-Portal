import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Logo from './assets/CRM_Logo.svg';
import DefaultUserImage from './assets/profilePic.svg';

export function Mainlayout({ children }) {
  const [username, setUsername] = useState('');
  const [userImage, setUserImage] = useState(DefaultUserImage);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUserData = JSON.parse(localStorage.getItem("userData"));
    if (savedUserData) {
      setUsername(`${savedUserData.firstName} ${savedUserData.secondName} ${savedUserData.lastName}`);
      setUserImage(savedUserData.image || DefaultUserImage);
    } else {
      setUsername('Kumar Satyam')
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    navigate('/');
  };

  return (
    <div className='bodyContainer h-100 px-5 py-3'>
      <Row className='upperBodyContainer'>
        <Col xs={12} md={4} className="d-flex flex-column">
          <Row className='titleLogo p-4'>
            <img src={Logo} alt="CRM Logo" className='logo' />
          </Row>
          <Row className='flex-grow-1'>
            <ul className='sectionList'>
              <li><Button as={Link} to="/dashboard" variant="link" className='text-decoration-none'>Dashboard</Button></li>
              <li><Button as={Link} to="/bugs" variant="link" className='text-decoration-none'>Bugs Tracking</Button></li>
              <li><Button as={Link} to="/performance" variant="link" className='text-decoration-none'>Performance / Achievements</Button></li>
              <li><Button as={Link} to="/check-in-out" variant="link" className='text-decoration-none'>Check-In/Out</Button></li>
              <li><Button as={Link} to="/holidays" variant="link" className='text-decoration-none'>Holidays</Button></li>
              <li><Button as={Link} to="/feedback" variant="link" className='text-decoration-none'>Feedback</Button></li>
              <li><Button as={Link} to="/contact-us" variant="link" className='text-decoration-none'>Contact Us</Button></li>
            </ul>
          </Row>
          <Row className='lowerBodyContainer mt-auto'>
            <Col className='loginDetils'>
              <Row className='userNameListOfSections'>
                <p className='m-0 fs-5 ps-0 fw-bold userNameMain'>
                  <img src={userImage} alt="User Avatar" className='userImage me-2' style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                  {username}
                </p>
              </Row>
              <Row className='signInDetils ms-4 ps-2'>
                <Button variant="link" onClick={handleSignOut} className='text-decoration-none ps-1 text-start'>Sign Out</Button>
              </Row>
            </Col>
          </Row>
        </Col>
        
        <Col xs={12} md={8} className='detailsOfSections'>
          <Row className='p-4 titleLogo'>
            <h1 className='text-center'>CRM Portal</h1>
          </Row>
          <Row>
            {children}
          </Row>
        </Col>
      </Row>
    </div>
  );
};
