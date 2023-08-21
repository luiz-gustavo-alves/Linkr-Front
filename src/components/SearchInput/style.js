import { css, styled } from 'styled-components'
export const Container = styled.div`
   display: flex;
   flex-direction: column;
   width: 100%;

   ${({ result }) => {
      return (
         result &&
         css`
            min-height: 176px;
            height: 176px;
            background: #e7e7e7;
            z-index: 10;
            border-radius: 8px;
         `
      )
   }}

   .searchInput {
      width: 100%;
      height: 45px;
      border: none;
      outline: none;
      border-radius: 8px;
      background: #fff;
      padding: 10px 17px;
      font-size: 19px;
      position: inherit;

      z-index: 10;
      &::placeholder {
         color: #c6c6c6;
      }
   }

   .searchResult {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-inline: 17px;
      padding-top: 14px;

      p {
         color: #7e6e6e;
      }
   }

   @media (min-width: 938px) {
      ${({ result }) => {
         return (
            result &&
            css`
               min-height: 176px;
               height: 176px;
               background: #e7e7e7;
            `
         )
      }}

      width: 563px;
      min-height: 45px;
      border-radius: 8px;
      padding-bottom: 23px;
      position: relative;
      z-index: 100;
      display: flex;
      flex-direction: column;

      .searchInput {
         width: 563px;
         height: 45px;
         border: none;
         outline: none;
         border-radius: 8px;
         background: #fff;
         padding: 10px 17px;
         font-size: 19px;
         position: inherit;

         z-index: 10;
         &::placeholder {
            color: #c6c6c6;
         }
      }

      .searchResult {
         display: flex;
         flex-direction: column;
         gap: 16px;
         padding-inline: 17px;
         padding-top: 14px;

         p {
            color: #7e6e6e;
         }
      }
   }
`
