import { useEffect, useState } from 'react';
import {
   initialPaginationInfo,
   getTotalPages,
   getOffset,
} from '../helpers/helpPagination';

const useTable = (apiUsers) => {
   const [users, setUsers] = useState(apiUsers);
   const [pagination, setPagination] = useState(initialPaginationInfo);
   const totalPages = getTotalPages(users.length, pagination.elementsPerPage);

   if (pagination.offset >= users.length && users.length > 0)
      setPagination((previousPagination) => ({
         page: previousPagination.page - 1,
         offset: getOffset(
            previousPagination.page - 1,
            previousPagination.elementsPerPage
         ),
         elementsPerPage: previousPagination.elementsPerPage,
      }));

   useEffect(() => {
      setUsers(apiUsers);
   }, [apiUsers]);

   const handleUserFilter = (e, setIsVisible) => {
      setUsers(
         apiUsers.filter((user) => {
            if (e.target.value) {
               setIsVisible(true);
            } else {
               setIsVisible(false);
            }
            if (pagination.page !== 1) setPagination(initialPaginationInfo);
            const userName = `${user.first_name} ${user.last_name}`;
            const userEmail = user.email;
            return (
               userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
               userEmail.toLowerCase().includes(e.target.value.toLowerCase())
            );
         })
      );
   };

   const clearUserFilter = (searchRef, setIsVisible) => {
      searchRef.current.value = '';
      setIsVisible(false);
      setUsers(apiUsers);
      setPagination(initialPaginationInfo);
   };

   const handleClick = (e) => {
      setPagination((previousPagination) => ({
         page: Number(e.target.textContent),
         offset: getOffset(
            Number(e.target.textContent),
            previousPagination.elementsPerPage
         ),
         elementsPerPage: previousPagination.elementsPerPage,
      }));
      window.scrollTo(0, 0);
   };

   const handlePreviousPage = () => {
      if (pagination.page > 1)
         setPagination((previousPagination) => ({
            page: previousPagination.page - 1,
            offset: getOffset(
               previousPagination.page - 1,
               previousPagination.elementsPerPage
            ),
            elementsPerPage: previousPagination.elementsPerPage,
         }));
      window.scrollTo(0, 0);
   };

   const handleNextPage = () => {
      if (pagination.page < totalPages)
         setPagination((previousPagination) => ({
            page: previousPagination.page + 1,
            offset: getOffset(
               previousPagination.page + 1,
               previousPagination.elementsPerPage
            ),
            elementsPerPage: previousPagination.elementsPerPage,
         }));
      window.scrollTo(0, 0);
   };

   return {
      users,
      pagination,
      totalPages,
      handleUserFilter,
      clearUserFilter,
      handleClick,
      handlePreviousPage,
      handleNextPage,
   };
};

export default useTable;
