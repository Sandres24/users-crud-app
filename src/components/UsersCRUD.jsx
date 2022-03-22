import React from 'react';
import useCRUD from '../hooks/useCRUD';
import ButtonModal from './ButtonModal';
import UserForm from './UserForm';
import Header from './Header';
import Modal from './Modal';
import UsersTable from './UsersTable';
import Loader from './Loader';

const UsersCRUD = () => {
   const {
      apiUsers,
      userToUpdate,
      getUserToUpdate,
      postUser,
      updateUser,
      deleteUser,
   } = useCRUD();

   return (
      <div className='users-crud'>
         <Header />
         <div className='container-new-button container-fluid mt-5 p-0'>
            <ButtonModal classes={'btn-success py-2 px-3'}>
               <i className='fa-solid fa-plus'></i> New
            </ButtonModal>
         </div>
         <Modal title={userToUpdate.id ? 'Update user' : 'Create user'}>
            <UserForm
               userToUpdate={userToUpdate}
               getUserToUpdate={getUserToUpdate}
               postUser={postUser}
               updateUser={updateUser}
            />
         </Modal>
         {!apiUsers && <Loader />}
         {apiUsers && (
            <UsersTable
               apiUsers={apiUsers}
               getUserToUpdate={getUserToUpdate}
               deleteUser={deleteUser}
            />
         )}
      </div>
   );
};

export default UsersCRUD;
