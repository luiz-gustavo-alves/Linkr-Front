import { Container } from './index.style'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useRef, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { ProfilePicture } from '../Posts/PostContent/style'
import SearchInput from '../SearchInput'
import { useNavigate } from 'react-router-dom'

export default function Header() {
   const { logout } = useContext(AuthContext)
   const navigate = useNavigate()
   const [toggleLogout, setToggleLogout] = useState(false)
   const [userPicture, setUserPicture] = useState(null)
   const menuRef = useRef(null)

   const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
         setToggleLogout(false)
      }
   }

   useEffect(() => {
      const { imageURL } = JSON.parse(localStorage.getItem('auth'))
      setUserPicture(imageURL)
   }, [])

   useEffect(() => {
      document.addEventListener('click', handleDocumentClick)
      return () => {
         document.removeEventListener('click', handleDocumentClick)
      }
   }, [])

   return (
      <Container open={toggleLogout}>
         <ul>
            <li onClick={() => navigate('/timeline')}>linkr</li>
            <li>
               <SearchInput />
            </li>
            <li onClick={() => setToggleLogout(!toggleLogout)} ref={menuRef}>
               <MdKeyboardArrowDown  className="icon" />
               <ProfilePicture data-test="avatar" src={userPicture} />
               <div data-test="menu">
                  <span data-test="logout" onClick={logout}>Logout</span>
               </div>
            </li>
         </ul>
      </Container>
   )
}

