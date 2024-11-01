import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

export function Feedback() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Container className="px-5 py-3 feedbackFormMain">
      <h2 className="text-center mb-4">We Value Your Feedback</h2>

      {submitted && (
        <Alert variant="success" className="text-center">
          Thank you for your feedback! We'll get back to you soon.
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col className='inputFeedback'>
            <Form.Group controlId="formName">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className='inputFeedback'>
            <Form.Group controlId="formEmail">
              <Form.Label>Your Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col className='inputFeedback'>
            <Form.Group controlId="formMessage">
              <Form.Label>Your Feedback</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                placeholder="Share your thoughts or suggestions"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit Feedback
          </Button>
        </div>
      </Form>
    </Container>
  );
}
