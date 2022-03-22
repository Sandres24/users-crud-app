import React from 'react';

const ButtonModal = ({
   children,
   classes,
   user = null,
   getUserToUpdate = () => {},
}) => {
   return (
      <button
         className={`btn ${classes}`}
         type='button'
         data-bs-toggle='modal'
         data-bs-target='#staticBackdrop'
         onClick={() => {
            getUserToUpdate(user);
         }}
      >
         {children}
      </button>
   );
};

export default ButtonModal;
