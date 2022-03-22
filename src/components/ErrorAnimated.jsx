import '../scss/ErrorAnimated.scss';
import React from 'react';

const ErrorAnimated = ({ message }) => {
   return (
      <div className='error-submit mt-3 mb-0 p-0'>
         <div className='circle-border'></div>
         <div className='circle'>
            <div className='error'></div>
         </div>
         <small className='text-danger mt-2 d-block text-center'>
            {message}
         </small>
      </div>
   );
};

export default ErrorAnimated;
