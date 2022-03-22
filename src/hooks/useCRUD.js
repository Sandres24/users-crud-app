import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { APP_DEFAULT_CONFIG } from '../helpers/helpAppConfig';

const useCRUD = () => {
   const [apiUsers, setApiUsers] = useState(null);
   const [userToUpdate, setUserToUpdate] = useState({});

   const getUserToUpdate = (user) => {
      setUserToUpdate(user);
   };

   const getError = (signal, err) => {
      let error = {};
      if (!signal.aborted) {
         error = {
            error: err.isAxiosError,
            status: err.response?.status,
            statusText: err.response?.statusText || 'An error has ocurred',
         };
      } else {
         error = {
            error: true,
            status: '00',
            statusText: 'The server did not response',
         };
      }
      console.error(error);
      return Promise.reject(error);
   };

   const getUsers = useCallback(() => {
      const controller = new AbortController();
      const signal = controller.signal;
      axios
         .get(APP_DEFAULT_CONFIG.baseURL, {
            signal,
         })
         .then((res) => setApiUsers(res.data))
         .catch((err) => getError(signal, err));
      setTimeout(() => {
         controller.abort();
      }, APP_DEFAULT_CONFIG.timeUntilAbortRequest);
   }, []);

   const postUser = (user) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const userCreated = axios
         .post(APP_DEFAULT_CONFIG.baseURL, user, { signal })
         .then(() => getUsers())
         .catch((err) => getError(signal, err));
      setTimeout(() => {
         controller.abort();
      }, APP_DEFAULT_CONFIG.timeUntilAbortRequest);
      return userCreated;
   };

   const updateUser = (id, user) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const userUpdated = axios
         .put(`${APP_DEFAULT_CONFIG.baseURL}${id}/`, user, { signal })
         .then(() => getUsers())
         .catch((err) => getError(err));
      setTimeout(() => {
         controller.abort();
      }, APP_DEFAULT_CONFIG.timeUntilAbortRequest);
      return userUpdated;
   };

   const deleteUser = (id) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const userDeleted = axios
         .delete(`${APP_DEFAULT_CONFIG.baseURL}${id}/`, {
            signal,
         })
         .then(() => getUsers())
         .catch((err) => getError(signal, err));
      setTimeout(() => {
         controller.abort();
      }, APP_DEFAULT_CONFIG.timeUntilAbortRequest);
      return userDeleted;
   };

   useEffect(() => {
      getUsers();
   }, [getUsers]);

   return {
      apiUsers,
      userToUpdate,
      getUserToUpdate,
      getUsers,
      postUser,
      updateUser,
      deleteUser,
   };
};

export default useCRUD;
