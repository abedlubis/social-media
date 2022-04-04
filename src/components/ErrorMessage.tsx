import React from 'react';

interface IErrorMessageProps {
  message: string;
}

const ErrorMessage = React.memo(({ message }: IErrorMessageProps) => {
  if (message) {
    return (
      <div className="error-message">{message}</div>
    );
  }
  return null;
});

export default ErrorMessage;
