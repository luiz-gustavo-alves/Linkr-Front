import styled, { css } from 'styled-components'

import { AiFillHeart } from 'react-icons/ai'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'
import { AiOutlineComment } from 'react-icons/ai'
import { BiNavigation } from 'react-icons/bi'

const Container = styled.div`
   width: 100%;
   height: auto;
   display: flex;
   flex-direction: column;
   margin-bottom: 40px;
`

const PostContainer = styled.div`
   display: flex;
   padding: 20px;
   background-color: #000;
   border-top-left-radius: 10px;
   border-top-right-radius: 10px;

   @media (max-width: 938px) {
      border-top-left-radius: 0;
      border-top-right-radius: 0;
   }
`

const LeftPostContainer = styled.div`
   width: 80px;
   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   .tooltip {
      width: max-content;
      height: 24px;
      border-radius: 3px;
      background: rgba(255, 255, 255, 0.9);

      display: flex;
      align-items: center;
      justify-content: center;

      color: #505050;
      font-family: Lato;
      font-size: 11px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
   }
`

const ProfilePicture = styled.img`
   width: 50px;
   height: 50px;
   border-radius: 25px;
   object-fit: cover;
   cursor: pointer;
`

const PostOptions = styled.div`
   display: flex;
   flex-direction: column;
   gap: 20px;
   margin-top: 15px;
   align-items: center;

   .options {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
`

const LikeIcon = styled(AiFillHeart)`
   ${({ clicked, liked }) => {
      return clicked === 'true' && liked === 'false'
         ? css`
              color: red;
              stroke: red;
              stroke-width: 100px;
           `
         : clicked === 'false' && liked === 'true'
         ? css`
              color: red;
              stroke: red;
              stroke-width: 100px;
           `
         : css`
              fill: transparent;
              stroke: white;
              stroke-width: 100px;
           `
   }}
   width: 20px;
   height: 20px;
   cursor: pointer;
`

const CommentIcon = styled(AiOutlineComment)`
   
   width: 20px;
   height: 20px;
   color: #FFF;
   cursor: pointer;
`;

const Counter = styled.h3`
   font-size: 11px;
   font-weight: 400;
   color: #fff;
   margin-top: 5px;
`

const RightPostContainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   margin-left: 15px;
   gap: 15px;
`

const RightPostTopContent = styled.div`
   display: flex;
   justify-content: space-between;
   align-items: center;
`

const PostTitle = styled.h3`
   cursor: pointer;
   font-size: 18px;
   color: #fff;
`

const EditPostForm = styled.form`
   width: 100%;

   textarea {
      width: 100%;
      height: 68px;
      resize: none;
      border: none;
      outline: none;
      border-radius: 7px;
      background-color: #efefef;
      padding: 10px;
      font-family: 'Lato', sans-serif;
      font-size: 15px;
      color: #949494;
   }
`

const IconsContainer = styled.div`
   display: flex;
   align-items: center;
   gap: 20px;
`

const EditIcon = styled(HiOutlinePencilAlt)`
   width: 25px;
   height: 25px;
   color: #fff;
   cursor: pointer;
   transition: all 0.2s;

   &:hover {
      opacity: 0.8;
   }
`

const DeleteIcon = styled(BsTrash)`
   width: 25px;
   height: 25px;
   color: #fff;
   cursor: pointer;
   transition: all 0.2s;

   &:hover {
      opacity: 0.8;
   }
`

const PostDescription = styled.h3`
   font-size: 17px;
   line-height: 24px;
   color: #b7b7b7;
`

const Hashtag = styled.span`
   font-weight: 600;
   color: #fff;
   cursor: pointer;
`

const CommentsContainer = styled.div`

   display: flex;
   flex-direction: column;
   gap: 10px;
   padding: 10px 20px;
   background-color: #1E1E1E;
`;

const CommentContent = styled.div`

   display: flex;
   gap: 25px;
   padding-bottom: 15px;
   padding-top: 10px;
   border-bottom: 2px solid #353535;

   .commentLeftContent {
      
      img {
         width: 40px;
         height: 40px;
         border-radius: 20px;
         object-fit: cover;
      }
   }

   .commentRightContent {
      
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 6px;
   }
   
   .commentUserDetails {

      display: flex;
      gap: 10px;

      h2 {
         font-size: 15px;
         color: #F3F3F3;
      }

      h3 {
         font-size: 15px;
         color: #565656;
      }
   }

   .comment {

      h3 {
         font-size: 15px;
         line-height: 25px;
         color: #ACACAC;
      }
   } 
`;

const UserCommentContainer = styled.div`

   display: flex;
   gap: 20px;
   height: 60px;
   align-items: center;
   padding: 10px 20px;
   background-color: #1E1E1E;

   .userLeftCommentContainer {

      img {
         width: 40px;
         height: 40px;
         border-radius: 20px;
         object-fit: cover;
      }
   }

   .userRightCommentContainer {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 6px;
      position: relative;

      input {
         width: 100%;
         height: 40px;
         border: none;
         outline: none;
         border-radius: 8px;
         background: #252525;
         padding: 10px 50px 10px 17px;
         font-size: 16px;
         color: #FFF;

         &::placeholder {
            color: #575757;
         }
      }

      button {
         background-color: inherit;
         outline: none;
         border: none;
         position: absolute;
         right: 10px;
         top: 10px;
      }
   }
`;

const SendCommentIcon = styled(BiNavigation)`

   width: 20px;
   height: 20px;
   color: #FFF;
   cursor: pointer;
`;

export {
   Container,
   PostContainer,
   LeftPostContainer,
   ProfilePicture,
   PostOptions,
   LikeIcon,
   CommentIcon,
   Counter,
   RightPostContainer,
   RightPostTopContent,
   PostTitle,
   EditPostForm,
   IconsContainer,
   EditIcon,
   DeleteIcon,
   PostDescription,
   Hashtag,
   CommentsContainer,
   CommentContent,
   UserCommentContainer,
   SendCommentIcon
}
