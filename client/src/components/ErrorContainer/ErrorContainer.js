import React from 'react';
import './ErrorContainer.css';

const ErrorContainer = ({success, msg}) => {
  if(success || success === null) return null;
  return (
    <p data-testid='errorCont'>{msg}</p>
  );
}

export default ErrorContainer;
