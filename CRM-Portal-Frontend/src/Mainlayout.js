import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import Logo from './assets/CRM_Logo.svg';
import { UserContext } from './context/UserContext';
import { $CommonServiceFn } from './network/Services';
import { $Service_Url } from './network/UrlPath';
import konsole from './controls/Konsole';

export function Mainlayout({ children }) {
  const { username, userImage } = useContext(UserContext);
  const [sidebarTitles, setSidebarTitles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSidebarTitles();
  }, []);

  const fetchSidebarTitles = async () => {
    $CommonServiceFn.InvokeCommonApi('GET', $Service_Url.sideBarTitle, null, (data, error) => {
      if (data && data.titles) {
        setSidebarTitles(data.titles);
      } else {
        konsole.error('No titles found in response:', data);
      }
    });
  };  

  const handleSignOut = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
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
            {sidebarTitles.map((title, index) => (
                <li key={index}>
                  <Button as={Link} to={`/${title.toLowerCase().replace(/ /g, '-')}`} variant="link" className='text-decoration-none'>
                    {title}
                  </Button>
                </li>
              ))}
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
