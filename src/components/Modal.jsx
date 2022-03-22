import '../styles/Modal.css';
import React from 'react';

const Modal = ({ children, title }) => {
   return (
      <div
         className='modal fade'
         id='staticBackdrop'
         data-bs-backdrop='static'
         data-bs-keyboard='false'
         tabIndex='-1'
         aria-labelledby='staticBackdropLabel'
         aria-hidden='true'
      >
         <div className='custom-modal-dialog modal-dialog modal-dialog-scrollable'>
            <div className='modal-content'>
               <div className='modal-header'>
                  <h5 className='modal-title text-black' id='exampleModalLabel'>
                     {title}
                  </h5>
                  <button
                     type='button'
                     className='custom-btn-close btn-close'
                     data-bs-dismiss='modal'
                     aria-label='Close'
                  ></button>
               </div>
               <div className='modal-body'>{children}</div>
            </div>
         </div>
      </div>
   );
};

export default Modal;
