import React from 'react';
import './ErrorContainer.css';

const ErrorContainer = ({error}) => {
  if(!error.error) return null;
  return (
    <p data-testid='errorCont' className='ErrorContainer'>{error.msg}</p>
  );
}

export default ErrorContainer;
