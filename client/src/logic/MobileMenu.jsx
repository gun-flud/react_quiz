import { useState } from 'react';
import { Link } from 'react-router'
import menuIcon from '../assets/menu-icon.svg'
import { useNavigate } from 'react-router'

function MobileMenu ({ isOpen, Close }) {

    return (
        //<div className={`fixed flex justify-end w-full h-full bg-gray-700/80 top-0 left-0 z-30 ${isOpen ? 'block' : 'hidden'}`} onClick={Close}></div>
        <div className={`fixed flex justify-end w-full h-full bg-gray-700/80 top-0 left-0 z-30 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={Close}>
            <div className={`fixed h-full bg-white w-2/3 z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end items-center  top-0 h-25 px-4 sm:px-6 lg:px-8 ">
                    <img src={menuIcon} alt="Close Menu" className="button" onClick={Close}/>
                </div>
                <nav className="flex flex-col gap-4 p-4">
                    <Link to="/login" className="button" onClick={Close}>Log in</Link>
                    <Link to="/" className="button" onClick={Close}>Quizzes</Link>
                    <Link to="/results" className="button" onClick={Close}>Results</Link>
                    <Link to="/" className="button" onClick={Close}>Help</Link>
                </nav>
            </div>
        </div>
    );
}
export default MobileMenu;