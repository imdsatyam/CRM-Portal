import React from 'react';
import { useLocation } from 'react-router-dom';

export function Dashboard() {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/dashboard':
        return <p>Welcome to the Dashboard. Select a section from the menu on the left.</p>;
      case '/bugs':
        return <p>View and track bugs here.</p>;
      case '/performance':
        return <p>Check out performance metrics and achievements.</p>;
      case '/check-in-out':
        return <p>Manage check-ins and check-outs.</p>;
      case '/holidays':
        return <p>View and manage holidays.</p>;
      case '/feedback':
        return <p>Provide and view feedback here.</p>;
      case '/contact-us':
        return <p>Contact us for more information or support.</p>;
        case '/new-user':
        return <p>View and manage users.</p>;
      default:
        return <p>Select a section to see details.</p>;
    }
  };

  return renderContent();
}
