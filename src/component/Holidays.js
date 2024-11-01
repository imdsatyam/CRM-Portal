import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Container, Form, Button, Card } from 'react-bootstrap';

export function Holidays() {
  const [selectedDates, setSelectedDates] = useState([]);
  const [leaveDescription, setLeaveDescription] = useState('');
  const [leaveHistory, setLeaveHistory] = useState([]);

  const holidays = [
    new Date(2024, 0, 1),
    new Date(2024, 1, 26),
    new Date(2024, 7, 15),
    new Date(2024, 9, 2),
    new Date(2024, 11, 25),
  ];

  const handleDateChange = (date) => {
    const dateString = date.toDateString();
    if (selectedDates.some(selectedDate => selectedDate.toDateString() === dateString)) {
      setSelectedDates(selectedDates.filter(selectedDate => selectedDate.toDateString() !== dateString));
    } else {
      setSelectedDates([...selectedDates, date]);
    }

    setLeaveDescription('');
  };

  const handleSaveLeave = () => {
    if (selectedDates.length > 0 && leaveDescription) {
      setLeaveHistory((prevHistory) => [
        ...prevHistory,
        { dates: selectedDates, description: leaveDescription },
      ]);

      setLeaveDescription('');
      setSelectedDates([]);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const isHoliday = holidays.some(holiday => holiday.toDateString() === date.toDateString());
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      return (
        <abbr
          aria-label={date.toDateString()}
          className={isWeekend ? 'weekend' : isHoliday ? 'holiday' : ''}
        >
          {date.getDate()}
        </abbr>
      );
    }
  }

  return (
    <Container className="px-5 py-3 holidayMain">
      <h2 className="text-center mb-4">Holiday & Leave Calendar</h2>

      <div className="mb-3 d-flex justify-content-center">
        <Calendar
          onChange={handleDateChange}
          value={selectedDates}
          tileContent={tileContent}
          multiple={true}
          tileClassName={({ date }) => {
            const isSelected = selectedDates.some(selectedDate => selectedDate.toDateString() === date.toDateString());
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            return isSelected ? 'selected-date' : (isWeekend ? 'weekend-date' : '');
          }}
        />
      </div>

      {selectedDates.length > 0 && (
        <Card className="p-3 mb-4">
          <Form.Group controlId="leaveDescription">
            <Form.Label>Leave Description</Form.Label>
            <p>{selectedDates.map(date => date.toDateString()).join(', ')}</p>
            <Form.Control
              as="textarea"
              style={{ height: '130px' }}
              rows={3}
              value={leaveDescription}
              onChange={(e) => setLeaveDescription(e.target.value)}
              placeholder="Describe your leave (e.g., Sick leave, Vacation)"
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSaveLeave} className="mt-3">
            Save Leave
          </Button>
        </Card>
      )}
      
      <h4 className="text-center mt-4">Your Leave History</h4>
      {leaveHistory.length > 0 ? (
        leaveHistory.map((leave, index) => (
          <Card key={index} className="p-3 my-2">
            <strong>Dates:</strong> {leave.dates.map(date => date.toDateString()).join(', ')}
            <br />
            <strong>Description:</strong> {leave.description}
          </Card>
        ))
      ) : (
        <p className="text-center mt-3">No leave records yet.</p>
      )}
    </Container>
  );
}
