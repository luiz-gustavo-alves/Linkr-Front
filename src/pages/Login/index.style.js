import { styled } from 'styled-components'

export const Container = styled.div`
   width: 100%;
   height: 100vh;
   background: #333333;

   font-weight: 700;
   color: #ffffff;
`
export const Title = styled.div`
   width: 100%;
   height: 175px;
   background: #151515;
   box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

   font-family: 'Oswald';
   font-size: 23px;

   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;

   h1 {
      font-family: 'Passion One';
      font-size: 76px;
   }
`
export const Form = styled.form`
   display: flex;
   flex-direction: column;
   align-items: center;
   gap: 11px;

   margin-top: 40px;
   font-family: 'Passion One';
`

export const Input = styled.input`
   width: 330px;
   height: 55px;

   border-radius: 6px;
   border: none;

   font-family: Oswald;
   font-size: 22px;
   font-weight: 700;

   &:not([type='submit']) {
      padding: 10px 17px;
      background: #fff;

      &::placeholder {
         color: #9f9f9f;
      }
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

   margin-top: 9px;
`
