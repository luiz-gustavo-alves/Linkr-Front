import { styled } from 'styled-components'

export const Container = styled.div`
   width: 100%;
   height: 100vh;
   background: #333333;

   font-weight: 700;
   color: #ffffff;

   @media (min-width: 1024px) {
      display: flex;
      flex-direction: row;
   }
`
export const Title = styled.div`
   width: 100%;
   height: 175px;
   background: #151515;
   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   font-family: 'Oswald';
   font-size: 23px;

   h1 {
      font-family: 'Passion One';
      font-size: 76px;
      text-align: center;
   }

   @media (min-width: 1024px) {
      height: 100vh;
      font-size: 43px;
      padding: 0 100px 100px 0;

      h1 {
         font-size: 106px;
         text-align: left;
      }
   }
`
export const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 11px;

   margin-top: 40px;
   font-family: 'Passion One';

   @media (min-width: 1024px) {
      padding-inline: 54px;
      justify-content: center;
      margin-top: 0px;
   }
`

export const Input = styled.input`
   width: 330px;
   height: 55px;

   border-radius: 6px;
   border: none;

   font-family: Oswald;
   font-size: 22px;
   font-weight: 700;

   padding: 10px 17px;
   background: #fff;

   &::placeholder {
      color: #9f9f9f;
   }

   &:disabled {
      color: grey;
      cursor: not-allowed;
   }
`

export const InputButton = styled.button`
   width: 330px;
   height: 55px;

   display: flex;
   align-items: center;
   justify-content: center;
   gap: 10px;

   border-radius: 6px;
   border: none;
   cursor: pointer;

   font-family: Oswald;
   font-size: 22px;
   font-weight: 700;
   background: #1877f2;
   color: #fff;

   &:disabled {
      filter: grayscale(100%);
      color: grey;
      cursor: not-allowed;
   }
`

export const Link = styled.a`
   color: #fff;
   font-family: Lato;
   font-size: 17px;
   font-weight: 400;
   line-height: normal;
   text-decoration-line: underline;
   cursor: pointer;
   margin-top: 9px;
`
