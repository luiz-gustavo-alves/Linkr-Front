import { css, styled } from 'styled-components'
import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect, useState } from 'react'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { ProfilePicture } from '../Posts/PostContent/style'

export default function Header() {
   /* const { logout } = useContext(AuthContext) */
   const [toggleLogout, setToggleLogout] = useState(false)

   useEffect(() => {}, [])
   return (
      <Container open={toggleLogout}>
         <ul>
            <li>linkr</li>
            <li>
               <input type="text" placeholder="Search for people" />
            </li>
            <li onClick={() => setToggleLogout(!toggleLogout)}>
               <MdKeyboardArrowDown className="icon" />
               <ProfilePicture src="http://a" />

               <div>
                  <span>Logout</span>
               </div>
            </li>
         </ul>
      </Container>
   )
}

const Container = styled.div`
   width: 100%;
   height: 72px;
   background: #151515;
   color: #fff;
   font-family: 'Lato';
   font-size: 17px;
   padding-inline: 28px;

   ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      li {
         &:nth-child(1) {
            font-family: 'Passion One';
            font-size: 49px;
            font-weight: 700;
            letter-spacing: 2.45px;
         }

         &:nth-child(2) input {
            width: 563px;
            height: 45px;
            border: none;
            border-radius: 8px;
            background: #fff;
            padding: 10px 17px;

            font-size: 19px;

            &::placeholder {
               color: #c6c6c6;
            }
         }

         &:nth-child(3) {
            display: flex;
            align-items: center;
            position: relative;
            gap: 16px;

            .icon {
               font-size: 48px;
               transform: rotate(0deg);
               transition: transform 0.3s ease;

               ${({ open }) => {
                  if (open)
                     return css`
                        transform: rotate(180deg);
                     `
               }}
            }

            div {
               width: 150px;
               height: 0px;
               overflow: hidden;

               display: flex;
               align-items: center;
               justify-content: center;

               font-size: 17px;
               font-style: normal;
               font-weight: 700;
               line-height: normal;
               letter-spacing: 0.85px;

               background: #151515;
               border-radius: 0px 0px 0px 20px;

               position: absolute;
               right: -28px;
               top: 60px;
               transition: height 0.3s ease;

               ${({ open }) => {
                  if (open)
                     return css`
                        height: 50px;
                     `
               }}
               span {
                  cursor: pointer;
               }
            }
         }
      }
   }
`
