import '../styles/UserForm.css';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SuccessAnimated from './SuccessAnimated';
import ErrorAnimated from './ErrorAnimated';

const UserForm = ({ userToUpdate, getUserToUpdate, postUser, updateUser }) => {
   const [successSubmitCreation, setSuccessSubmitCreation] = useState(false);
   const [successSubmitUpdate, setSuccessSubmitUpdate] = useState(false);
   const [errorSubmit, setErrorSubmit] = useState(false);
   const [isVisible, setIsVisible] = useState(false);

   return (
      <Formik
         enableReinitialize
         initialValues={{
            firstname: userToUpdate.first_name || '',
            lastname: userToUpdate.last_name || '',
            email: userToUpdate.email || '',
            birthday: userToUpdate.birthday || '',
            password: userToUpdate.password || '',
            confirmpassword: '',
         }}
         validate={(values) => {
            let errors = {};
            if (!values.firstname) {
               errors.firstname = 'This field is required';
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.firstname)) {
               errors.nombre = 'Invalid first name';
            }

            if (!values.lastname) {
               errors.lastname = 'This field is required';
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.lastname)) {
               errors.lastname = 'Invalid last name';
            }

            if (!values.email) {
               errors.email = 'This field is required';
            } else if (
               !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                  values.email
               )
            ) {
               errors.email = 'Invalid email';
            }

            if (!values.birthday) errors.birthday = 'This field is required';

            if (!values.password) errors.password = 'This field is required';

            if (!values.confirmpassword)
               errors.confirmpassword = 'This field is required';

            if (
               values.password &&
               values.confirmpassword &&
               values.password !== values.confirmpassword
            )
               errors.confirmpassword = 'The passwords must be the same';

            return errors;
         }}
         onSubmit={(values, { resetForm }) => {
            const user = {
               first_name: values.firstname,
               last_name: values.lastname,
               email: values.email,
               birthday: values.birthday,
               password: values.password,
            };
            if (!userToUpdate.id) {
               postUser(user)
                  .then(() => {
                     setSuccessSubmitCreation(true);
                     setTimeout(() => {
                        if (isVisible) setIsVisible(false);
                        resetForm();
                        setSuccessSubmitCreation(false);
                     }, 2000);
                  })
                  .catch(() => {
                     setErrorSubmit(true);
                     setTimeout(() => {
                        setErrorSubmit(false);
                     }, 2000);
                  });
            } else {
               updateUser(userToUpdate.id, user)
                  .then(() => {
                     setSuccessSubmitUpdate(true);
                     if (isVisible) setIsVisible(false);
                     getUserToUpdate({});
                     resetForm();
                     setTimeout(() => {
                        setSuccessSubmitUpdate(false);
                     }, 2000);
                  })
                  .catch(() => {
                     setErrorSubmit(true);
                     setTimeout(() => {
                        setErrorSubmit(false);
                     }, 2000);
                  });
            }
         }}
      >
         {({ resetForm, errors }) => (
            <Form>
               <div className='custom-form bg-dark mx-auto rounded-3 py-2 px-4'>
                  <div className='custom-row row'>
                     <div className='field firstname-field my-2'>
                        <b>
                           <label className='form-label' htmlFor='firstname'>
                              First name:
                           </label>
                        </b>
                        <Field
                           className='custom-input form-control'
                           type='text'
                           name='firstname'
                           id='firstname'
                           placeholder='User first name'
                           autoComplete='off'
                        />
                        <ErrorMessage
                           name='firstname'
                           component={() => (
                              <small className='error-message-validation text-danger'>
                                 {errors.firstname}
                              </small>
                           )}
                        />
                     </div>
                     <div className='field lastname-field my-2'>
                        <b>
                           <label className='form-label' htmlFor='lastname'>
                              Last name:
                           </label>
                        </b>
                        <Field
                           className='custom-input form-control'
                           type='text'
                           name='lastname'
                           id='lastname'
                           placeholder='User last name'
                           autoComplete='off'
                        />
                        <ErrorMessage
                           name='lastname'
                           component={() => (
                              <small className='error-message-validation text-danger'>
                                 {errors.lastname}
                              </small>
                           )}
                        />
                     </div>
                  </div>

                  <div className='custom-row row'>
                     <div className='field email-field my-2'>
                        <b>
                           <label className='form-label' htmlFor='email'>
                              email:
                           </label>
                        </b>
                        <Field
                           className='custom-input form-control'
                           type='text'
                           name='email'
                           id='email'
                           placeholder='User email'
                           autoComplete='off'
                        />
                        <ErrorMessage
                           name='email'
                           component={() => (
                              <small className='error-message-validation text-danger'>
                                 {errors.email}
                              </small>
                           )}
                        />
                     </div>
                     <div className='field birthday-field my-2'>
                        <b>
                           <label className='form-label' htmlFor='birthday'>
                              Birthday:
                           </label>
                        </b>
                        <Field
                           className='custom-input form-control'
                           type='date'
                           name='birthday'
                           id='birthday'
                        />
                        <ErrorMessage
                           name='birthday'
                           component={() => (
                              <small className='error-message-validation text-danger'>
                                 {errors.birthday}
                              </small>
                           )}
                        />
                     </div>
                  </div>
                  <div className='custom-row row'>
                     <div className='field password-field my-2'>
                        <b>
                           <label className='form-label' htmlFor='password'>
                              Password:
                           </label>
                        </b>
                        <div className='input-field'>
                           <Field
                              className='custom-input password-input form-control'
                              type={isVisible ? 'text' : 'password'}
                              name='password'
                              id='password'
                              placeholder='User password'
                              autoComplete='off'
                           />
                           <i
                              className='eye-icon fa-solid fa-eye'
                              onClick={() => setIsVisible(!isVisible)}
                           ></i>
                           <ErrorMessage
                              name='password'
                              component={() => (
                                 <small className='error-message-validation text-danger'>
                                    {errors.password}
                                 </small>
                              )}
                           />
                        </div>
                     </div>
                     <div className='field confirm-password-field my-2'>
                        <b>
                           <label
                              className='form-label'
                              htmlFor='confirm-password'
                           >
                              Confirm password:
                           </label>
                        </b>
                        <div className='input-field'>
                           <Field
                              className='custom-input password-input form-control'
                              type={isVisible ? 'text' : 'password'}
                              name='confirmpassword'
                              id='confirm-password'
                              placeholder='Confirm user password'
                              autoComplete='off'
                           />
                           <i
                              className='eye-icon fa-solid fa-eye'
                              onClick={() => setIsVisible(!isVisible)}
                           ></i>
                           <ErrorMessage
                              name='confirmpassword'
                              component={() => (
                                 <small className='error-message-validation text-danger'>
                                    {errors.confirmpassword}
                                 </small>
                              )}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {successSubmitCreation && (
                  <SuccessAnimated message={'User created successfully!'} />
               )}
               {successSubmitUpdate && (
                  <SuccessAnimated message={'User updated successfully!'} />
               )}
               {errorSubmit && (
                  <ErrorAnimated message={'Something went wrong!'} />
               )}

               <div className='container-buttons-submition container-fluid mt-3 p-0'>
                  <div className='row'>
                     <div className='col-8'>
                        <button
                           className='btn btn-success'
                           type='submit'
                           /* data-bs-dismiss='modal' */
                        >
                           Save
                        </button>
                        <button
                           className='btn btn-danger ms-2'
                           type='button'
                           data-bs-dismiss='modal'
                           onClick={() => {
                              if (userToUpdate.id) getUserToUpdate({});
                              if (isVisible) setIsVisible(false);
                              resetForm();
                           }}
                        >
                           Cancell
                        </button>
                     </div>
                     <div className='col-4 text-end'>
                        <button
                           type='button'
                           className='btn btn-secondary'
                           onClick={() => {
                              if (userToUpdate.id) getUserToUpdate({});
                              if (isVisible) setIsVisible(false);
                              resetForm();
                           }}
                        >
                           Clear
                        </button>
                     </div>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
};

export default UserForm;
