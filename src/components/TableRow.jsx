import React from 'react';
import Swal from 'sweetalert2';
import ButtonModal from './ButtonModal';

const TableRow = ({ user, getUserToUpdate, deleteUser }) => {
   const handleDeleteUser = (id) => {
      Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
         if (result.isConfirmed) {
            deleteUser(id)
               .then(() => {
                  Swal.fire('Deleted!', 'The user has been deleted', 'success');
               })
               .catch(() => {
                  Swal.fire(
                     'Error',
                     'The user could not been deleted due to an error',
                     'error'
                  );
               });
         }
      });
   };

   return (
      <tr className='table-row-content'>
         <td className='id-cell align-middle' data-label='#'>
            {user.id}
         </td>
         <td className='firstname-cell align-middle' data-label='First name:'>
            {user.first_name}
         </td>
         <td
            className='lastfirstname-cell align-middle'
            data-label='Last name:'
         >
            {user.last_name}
         </td>
         <td className='email-cell align-middle' data-label='email:'>
            {user.email}
         </td>
         <td className='birthday-cell align-middle' data-label='Birthday:'>
            {user.birthday}
         </td>
         <td className='button-cell align-middle text-center'>
            <button
               className='btn btn-danger'
               type='button'
               onClick={() => handleDeleteUser(user.id)}
            >
               <i className='fa-solid fa-trash'></i>
            </button>
            <ButtonModal
               classes='btn-info'
               user={user}
               getUserToUpdate={getUserToUpdate}
            >
               <i className='fa-solid fa-pen-to-square'></i>
            </ButtonModal>
         </td>
      </tr>
   );
};

export default TableRow;
