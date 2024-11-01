import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

export function CheckInOut() {
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editRequest, setEditRequest] = useState({ date: null, checkIn: null, checkOut: null, description: '' });

  const handleCheckIn = () => {
    const currentTime = new Date();
    if (!checkInTime) {
      setCheckInTime(currentTime);
    }
  };

  const handleCheckOut = () => {
    const currentTime = new Date();
    if (checkInTime && !checkOutTime) {
      setCheckOutTime(currentTime);
      addHistoryEntry(checkInTime, currentTime);
    }
  };

  const addHistoryEntry = (checkIn, checkOut) => {
    setHistory(prevHistory => [
      ...prevHistory,
      { checkIn: checkIn.toLocaleString(), checkOut: checkOut.toLocaleString() }
    ]);
    setCheckInTime(null);
    setCheckOutTime(null);
  };

  const handleEditRequest = () => {
    if (editRequest.checkIn || editRequest.checkOut) {
      setHistory(prevHistory => [
        ...prevHistory,
        {
          checkIn: editRequest.checkIn ? editRequest.checkIn.toLocaleString() : '',
          checkOut: editRequest.checkOut ? editRequest.checkOut.toLocaleString() : '',
          description: editRequest.description
        }
      ]);
      setEditRequest({ date: null, checkIn: null, checkOut: null, description: '' });
      setEditMode(false);
    }
  };

  const todayDate = new Date().toLocaleDateString();

  return (
    <Container className="px-5 py-3 checkInOutMain">
      <h2>Daily Check-In / Check-Out</h2>
      <Row className='pt-2'>
        <Col className="my-3 currentDate">
          <strong>Current Date:</strong>
        </Col>
        <Col className="my-3 currentDate">
          <p className='fs-5 text-end'>{todayDate}</p>
        </Col>
      </Row>
      <Row>
        <Col className="my-3">
          <Button onClick={handleCheckIn}>Check In</Button>
        </Col>
        <Col className="my-3 d-flex justify-content-end">
          <Button onClick={handleCheckOut} className="ms-3">Check Out</Button>
        </Col>
      </Row>
      <h4 className="mt-4">History</h4>
      {history.length > 0 ? (
        history.map((entry, index) => (
          <Card key={index} className="p-3 my-2">
            <strong>Check-In:</strong> <p>{entry.checkIn || 'Not recorded'}</p>
            <strong>Check-Out:</strong> <p>{entry.checkOut || 'Not recorded'}</p>
            {entry.description && (
              <>
                <strong>Edit Request:</strong> {entry.description}
              </>
            )}
          </Card>
        ))
      ) : (
        <p>No check-in/check-out history yet.</p>
      )}
      <Button variant="secondary" onClick={() => setEditMode(true)} className="mt-4">Request Change</Button>
      {editMode && (
        <Card className="p-3 my-3">
          <h5>Request Change</h5>
          <Form.Group className="mb-3">
            <Form.Label>New Check-In Time</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setEditRequest(prev => ({ ...prev, checkIn: new Date(e.target.value) }))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Check-Out Time</Form.Label>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setEditRequest(prev => ({ ...prev, checkOut: new Date(e.target.value) }))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Request Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={editRequest.description}
              style={{height:'130px'}}
              onChange={(e) => setEditRequest(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Explain the reason for the change request"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleEditRequest}>Submit Request</Button>
          <Button variant="outline-secondary" onClick={() => setEditMode(false)} className="mt-3">Cancel</Button>
        </Card>
      )}
    </Container>
  );
}
