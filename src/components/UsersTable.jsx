import '../styles/UsersTable.css';
import React from 'react';
import TableRow from './TableRow';
import TableEmptyRow from './TableEmptyRow';
import SearchBar from './SearchBar';
import useTable from '../hooks/useTable';
import { getPagesRange } from '../helpers/helpPagination';

const UsersTable = ({ apiUsers, getUserToUpdate, deleteUser }) => {
   const {
      users,
      pagination,
      totalPages,
      handleUserFilter,
      clearUserFilter,
      handleClick,
      handlePreviousPage,
      handleNextPage,
   } = useTable(apiUsers);

   return (
      <table className='custom-table table table-dark table-hover my-3 mx-auto text-center'>
         <thead className='cell-height'>
            <tr>
               <th className='id-cell align-middle'>#</th>
               <th className='firstname-cell align-middle'>
                  First name<i className='cell-icon fa-solid fa-signature'></i>
               </th>
               <th className='lastfirstname-cell align-middle'>
                  Last name<i className='cell-icon fa-solid fa-signature'></i>
               </th>
               <th className='email-cell align-middle'>
                  email<i className='cell-icon fa-solid fa-envelope'></i>
               </th>
               <th className='birthday-cell align-middle'>
                  Birthday<i className='cell-icon fa-solid fa-cake-candles'></i>
               </th>
               <th className='actions-cell align-middle text-center'>
                  Actions<i className='cell-icon fa-solid fa-gear'></i>
               </th>
            </tr>
         </thead>
         <tbody>
            {apiUsers.length === 0 && (
               <TableEmptyRow message='The list is empty' />
            )}
            {users.length === 0 && apiUsers.length > 0 && (
               <TableEmptyRow message='There were no users found with this search' />
            )}
            {users.length > 0 &&
               users
                  .slice(
                     pagination.offset,
                     pagination.elementsPerPage + pagination.offset
                  )
                  .map((user) => (
                     <TableRow
                        key={user.id}
                        user={user}
                        getUserToUpdate={getUserToUpdate}
                        deleteUser={deleteUser}
                     />
                  ))}
         </tbody>
         <tfoot>
            <tr className='cell-height'>
               <td className='align-middle custom-cell' colSpan='3'>
                  <SearchBar
                     handleUserFilter={handleUserFilter}
                     clearUserFilter={clearUserFilter}
                  />
               </td>
               <td className='custom-cell align-middle' colSpan='4'>
                  {/* Pagination */}
                  <div className='pagination-section'>
                     <div className='pages-section'>
                        {pagination.page > 5 && (
                           <button
                              className='pagination-btn btn btn-light mx-1 py-0 px-2'
                              type='button'
                              disabled={true}
                           >
                              ...
                           </button>
                        )}
                        {totalPages > 1 &&
                           getPagesRange(totalPages, pagination.page).map(
                              (page) => (
                                 <button
                                    key={page}
                                    className='pagination-btn btn-page btn btn-light mx-1 py-0 px-2'
                                    type='button'
                                    disabled={pagination.page === page}
                                    onClick={handleClick}
                                 >
                                    {page}
                                 </button>
                              )
                           )}
                        {totalPages > 5 && (
                           <button
                              className='pagination-btn btn btn-light mx-1 py-0 px-2'
                              type='button'
                              disabled={true}
                           >
                              ...
                           </button>
                        )}
                     </div>
                     {totalPages > 1 && (
                        <div className='navigation-section'>
                           <button
                              className='pagination-btn btn btn-light mx-1 py-0 px-2'
                              type='button'
                              disabled={pagination.page === 1}
                              onClick={handlePreviousPage}
                           >
                              Prev
                           </button>
                           <p className='pagination-info'>
                              {`${pagination.page} / ${totalPages}`}
                           </p>
                           <button
                              className='pagination-btn btn btn-light mx-1 py-0 px-2'
                              type='button'
                              disabled={pagination.page === totalPages}
                              onClick={handleNextPage}
                           >
                              Next
                           </button>
                        </div>
                     )}
                  </div>
                  {/*  */}
               </td>
            </tr>
         </tfoot>
      </table>
   );
};

export default UsersTable;
