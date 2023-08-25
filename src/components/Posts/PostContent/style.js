import styled, { css } from 'styled-components'

import { AiFillHeart } from 'react-icons/ai'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { BsTrash } from 'react-icons/bs'

const PostContainer = styled.div`
   width: 100%;
   height: auto;
   display: flex;
   background-color: #000;
   border-radius: 16px;
   padding: 20px;

   @media (max-width: 938px) {
      border-radius: 0;
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

const LikeContainer = styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
   margin-top: 15px;
   align-items: center;
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

const LikeCounter = styled.h3`
   font-size: 11px;
   font-weight: 400;
   color: #fff;
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

export {
   PostContainer,
   LeftPostContainer,
   ProfilePicture,
   LikeContainer,
   LikeIcon,
   LikeCounter,
   RightPostContainer,
   RightPostTopContent,
   PostTitle,
   EditPostForm,
   IconsContainer,
   EditIcon,
   DeleteIcon,
   PostDescription,
   Hashtag
}
