import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router'
import { useNavigate } from 'react-router'

import { useResponsive } from '../logic/HandleResize.jsx'
import MobileMenu from '../logic/MobileMenu.jsx'
// importin generator and iterator
import PremiumIcon from '../ui/PremiumIcon.jsx'
import "../index.css"
import logoIcon from '../assets/logo-icon.png'
import menuIcon from '../assets/menu-icon.svg'

function Header() {
  const navigate = useNavigate();
  const { isMobile, isTablet, isDesktop, width } = useResponsive();

  const [isOpen, setIsOpen] = useState(false);
  const Open = () => setIsOpen(true); 
  const Close = () => setIsOpen(false);

  return (
    <>
    <header>
			<img src={logoIcon} alt="logo" className="icon" onClick={() => navigate('/')}/>
      {!isMobile ?
      <div className="toolbar">
      <Link to="/login" className="button">Log in</Link>
			<Link to="/" className="button">Quizzes</Link>
			<Link to="/results" className="button" >Results</Link>
			<Link to="/" className="button">Help</Link>
      </div> :
      <img src={menuIcon} alt="menu" className="button ml-auto" onClick={Open}/>}

      <MobileMenu isOpen={isOpen} Close={Close}/>
      <PremiumIcon endDate={new Date('2026-02-20T01:34:19Z').getTime()} />
		</header>
    </>
  )

}

export default Header



