import '../scss/SuccessAnimated.scss';
import React from 'react';

const SuccessAnimated = ({ message }) => {
   return (
      <div className='success-submit mt-3 mb-0 p-0'>
         <div className='success-checkmark'>
            <div className='check-icon'>
               <span className='icon-line line-tip'></span>
               <span className='icon-line line-long'></span>
               <div className='icon-circle'></div>
               <div className='icon-fix'></div>
            </div>
         </div>
         <small className='text-success mt-2 d-block text-center'>
            {message}
         </small>
      </div>
   );
};

export default SuccessAnimated;
