import '../styles/Header.css';
import peopleImage from '../assets/images/people.png';
import React from 'react';

const Header = () => {
   return (
      <header className='header'>
         <div className='header-content container-fluid d-flex justify-content-between align-items-center py-3'>
            <h1 className='title'>
               Users
               <span className='span-subtitle px-2'>management system</span>
            </h1>
            <div className='header-img-container container m-0'>
               <img className='header-img' src={peopleImage} alt='Users' />
            </div>
         </div>
      </header>
   );
};

export default Header;
