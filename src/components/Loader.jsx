import '../styles/Loader.css';
import React from 'react';

const Loader = () => {
   return (
      <div className='loader-container'>
         <div className='lds-roller'>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </div>
   );
};

export default Loader;
