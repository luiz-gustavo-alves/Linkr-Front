import { styled } from "styled-components"

export const Container = styled.div`
   display: flex;
   gap: 12px;
   align-items: center;
   word-break: break-all;
   cursor: pointer;

   &:hover {
      img {
         filter: brightness(90%);
      }
   }

   img {
      width: 39px;
      height: 39px;
      border-radius: 100%;
      transition: filter 0.3s ease;
   }
   span {
      width: 100%;
      color: #515151;
      font-family: Lato;
      font-size: 19px;

      span {
         color: #c5c5c5;
      }
   }
`