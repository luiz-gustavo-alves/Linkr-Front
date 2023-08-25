import { styled, css } from "styled-components"

export const Container = styled.div`
   width: 100%;
   height: 72px;
   background: #151515;
   color: #fff;
   font-family: 'Lato';
   font-size: 17px;
   padding-inline: 20px;
   margin-bottom: 90px;
   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

   ul {
      width: 100%;
      height: calc(100% + 72px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;

      li {
         &:nth-child(1) {
            font-family: 'Passion One';
            font-size: 49px;
            font-weight: 700;
            letter-spacing: 2.45px;
            cursor: pointer;
         }

         &:nth-child(2) {
            width: 100%;
            height: 45px;
            display: flex;
            justify-content: center;
            order: 3;
         }

         &:nth-child(3) {
            display: flex;
            align-items: center;
            position: relative;
            gap: 8px;
            order: 2;

            .icon {
               font-size: 31px;
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
               right: -20px;
               top: 60px;
               z-index: 20;
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

   @media (min-width: 938px) {
      ul {
         width: 100%;
         height: 100%;
         display: flex;
         justify-content: space-between;
         align-items: center;
         flex-wrap: nowrap;

         li {
            &:nth-child(1) {
               font-family: 'Passion One';
               font-size: 49px;
               font-weight: 700;
               letter-spacing: 2.45px;
            }

            &:nth-child(2) {
               height: 45px;
               order: 2;
            }

            &:nth-child(3) {
               display: flex;
               align-items: center;
               position: relative;
               gap: 16px;
               order: 3;
            }
         }
      }
   }
`
