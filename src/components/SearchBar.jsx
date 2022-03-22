import React, { useRef, useState } from 'react';

const SearchBar = ({ handleUserFilter, clearUserFilter }) => {
   const searchRef = useRef(null);
   const [isVisible, setIsVisible] = useState(false);

   return (
      <div className='search-user-field'>
         <b>
            <label className='form-label m-0' htmlFor='searchbar'>
               Search:
            </label>
         </b>
         <div className='input-field w-75 ms-2'>
            <input
               ref={searchRef}
               className='custom-input search-user-input form-control'
               type='text'
               id='searchbar'
               placeholder='Type the user name or email'
               autoComplete='off'
               onChange={(e) => handleUserFilter(e, setIsVisible)}
            />
            {isVisible && (
               <i
                  className='x-icon fa-solid fa-xmark text-danger'
                  onClick={() => clearUserFilter(searchRef, setIsVisible)}
               ></i>
            )}
         </div>
      </div>
   );
};

export default SearchBar;
