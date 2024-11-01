import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

export function Contact() {
  return (
    <Container className="px-5 py-3 contactUsMain">
      <h2 className="text-center mb-4">Contact Us</h2>
      
      <Row className="mb-4 text-center">
        <Col>
          <h4>Our Address</h4>
          <p>Sector - 45, Noida, Uttar - Pradesh, India</p>
        </Col>
      </Row>
      
      <Row className="mb-4 text-center">
        <Col>
          <h4>Email Us</h4>
          <p><a href="mailto:mypara@mailinator.com" className="text-decoration-none">imdsatyam@gmail.com</a></p>
        </Col>
      </Row>
      
      <Row className="mb-4 text-center">
        <Col>
          <h4>Call Us</h4>
          <p><a href="tel:+913564774474" className="text-decoration-none">+91 83405 23583</a></p>
        </Col>
      </Row>
      
      <Row className="text-center">
        <Col>
          <h4>Business Hours</h4>
          <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
          <p>Saturday: 10:00 AM - 2:00 PM</p>
          <p>Sunday: Closed</p>
        </Col>
      </Row>

      <Row className="text-center mt-4">
        <Col>
          <h4>Follow Us</h4>
          <p>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="me-3">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
