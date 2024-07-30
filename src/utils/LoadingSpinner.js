import React from 'react';
import { Spinner } from 'reactstrap';

const LoadingSpinner = () => {
  return (
    <div className="text-center">
      <Spinner color="primary" />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;