import {
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
} from './style'

import URLContent from '../URLContent'
import Modal from '../../Modal'
import { Tooltip } from 'react-tooltip'

import React, { useState, useEffect, useContext } from 'react'
import postService from '../../../services/posts.service'
import { AuthContext } from '../../../contexts/auth.context'
import { useNavigate } from 'react-router-dom'
import userService from '../../../services/user.service'
import useFetchTimeline from '../../../hooks/useFetchTimeline'
import { styled } from 'styled-components'
import { FaRetweet } from 'react-icons/fa'

export default function PostContent({ data }) {
   const { auth } = useContext(AuthContext)
   const { fetchTimeline, updatePostOption } = useFetchTimeline()

   const [disabled, setDisabled] = useState(false)
   const [editPost, setEditPost] = useState(false)
   const [openModal, setOpenModal] = useState(false)

   const [currentUserID, setCurrentUserID] = useState(false)
   const [currentPostID, setCurrentPostID] = useState(false)
   const [currentPostData, setCurrentPostData] = useState(data)

   useEffect(() => {
      const [headerBase64, payloadBase64, signature] = auth.authToken.split('.')
      const payload = JSON.parse(atob(payloadBase64))

      setCurrentUserID(payload.id)
   }, [])

   const [formData, setFormData] = useState({
      description: data.description,
      URL: data.URL,
      postID: data.postID
   })

   function handleModal(postID) {
      setCurrentPostID(postID)
      setOpenModal(true)
   }

   function toggleEditPost() {
      editPost ? setEditPost(false) : setEditPost(true)
   }

   function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
   }

   function handleSubmit(e) {
      if (e.key === 'Enter' && !disabled) {
         setDisabled(true)

         const payload = {
            description: formData.description,
            URL: formData.URL
         }

         postService
            .updatePost(payload, formData.postID, auth.authToken)
            .then(() => {
               setEditPost(false)
               setDisabled(false)
               setFormData({
                  description: payload.description,
                  URL: payload.URL,
                  postID: formData.postID
               })
               fetchTimeline()
               updatePostOption('edit')
            })
            .catch(() => {
               alert('Houve um erro ao atualizar a postagem')
               setDisabled(false)
            })
      }
   }
   const navigate = useNavigate()
   const navigateToHashtag = (hashtag) => {
      const cleanedHashtag = hashtag.replace(/^#/, '')
      navigate(`/hashtag/${cleanedHashtag}`)
   }

   function postDescriptionParser(description) {
      const parser = description.split(' ').map((text, index) => {
         if (text.startsWith('#')) {
            return (
               <Hashtag onClick={() => navigateToHashtag(text)} key={index} title={text}>
                  {text}{' '}
               </Hashtag>
            )
         } else {
            return <React.Fragment key={index}>{text} </React.Fragment>
         }
      })

      return parser
   }

   function handleFocus(e) {
      let temp = e.target.value
      e.target.value = ''
      e.target.value = temp
   }

   useEffect(() => {
      if (editPost) {
         setFormData({
            description: data.description,
            URL: data.URL,
            postID: formData.postID
         })
      }

      const handleEsc = (e) => {
         if (e.key === 'Escape') {
            setEditPost(false)
            setFormData({
               description: data.description,
               URL: data.URL
            })
         }
      }

      window.addEventListener('keydown', handleEsc)

      return () => {
         window.removeEventListener('keydown', handleEsc)
      }
   }, [editPost])

   function goToUser(id) {
      navigate(`/user/${id}`)
   }

   const [liked, setLiked] = useState(false)

   function handleContentTooltip(postID) {
      const likes = currentPostData.likes
      const lastLikes = []
      const userLiked = currentPostData.allLikedUserIDs.includes(currentUserID)

      currentPostData['lastLikes'].forEach((like) => {
         if (like.id !== currentUserID) {
            lastLikes.push(like.name)
         }
      })

      return likes === 0
         ? 'Não há curtidas!'
         : likes === 1 && userLiked
         ? `Você e outras ${likes - 1} pessoas`
         : likes >= 2 && userLiked
         ? `Você, ${lastLikes[0] || 'Você'} e outras ${likes - 2} pessoas`
         : likes >= 2 && !userLiked
         ? `${lastLikes[0] || 'Você'}, ${lastLikes[1] || 'Você'} e outras ${likes - 2} pessoas`
         : `${lastLikes[0] || 'Você'} e outras ${likes - 1} pessoas`
   }

   function handleLike(postID) {
      userService
         .postLike({ token: auth.authToken, postID })
         .then((response) => {
            setCurrentPostData({ ...data, likes: response.data.currentLikes })
            setLiked(!liked)
         })
         .catch((error) => console.log(error))
   }

   function handleRepost(likes) {
      if (likes === '0') return true
      return false
   }

   return (
      <Container>
         {handleRepost(data.likes) && (
            <span>
               <RepostIcon /> Re-posted by you
            </span>
         )}
         <PostContainer data-test="post">
            {openModal && (
               <Modal
                  setOpenModal={setOpenModal}
                  updatePostOption={updatePostOption}
                  token={auth.authToken}
                  postID={currentPostID}
               />
            )}

            <LeftPostContainer>
               <ProfilePicture
                  src={currentPostData.user.img}
                  onClick={() => goToUser(currentPostData.user.id)}
               />
               <LikeContainer>
                  <LikeIcon
                     data-test="like-btn"
                     onClick={() => handleLike(currentPostData.postID)}
                     clicked={currentPostData.allLikedUserIDs.includes(currentUserID).toString()}
                     liked={liked.toString()}
                  />
                  <LikeCounter data-test="counter" id={`anchorTooltip-${currentPostData.postID}`}>
                     {currentPostData.likes} likes
                  </LikeCounter>
               </LikeContainer>

               <Tooltip
                  data-test="tooltip"
                  place="bottom"
                  className="tooltip"
                  anchorSelect={`#anchorTooltip-${currentPostData.postID}`}
                  content={() => handleContentTooltip(currentPostData.postID)}
               />
            </LeftPostContainer>

            <RightPostContainer>
               <RightPostTopContent>
                  <PostTitle data-test="username" onClick={() => goToUser(data.user.id)}>
                     {data.user.name}
                  </PostTitle>
                  {data.postOwner === '1' && (
                     <IconsContainer>
                        <EditIcon data-test="edit-btn" onClick={toggleEditPost} />
                        <DeleteIcon
                           data-test="delete-btn"
                           onClick={() => handleModal(data.postID)}
                        />
                     </IconsContainer>
                  )}
               </RightPostTopContent>
               {editPost ? (
                  <EditPostForm>
                     <textarea
                        type="text"
                        name="description"
                        data-test="edit-input"
                        value={formData.description}
                        onChange={handleChange}
                        disabled={disabled}
                        autoFocus
                        onFocus={handleFocus}
                        onKeyDown={handleSubmit}
                     />
                  </EditPostForm>
               ) : (
                  <PostDescription data-test="description">
                     {postDescriptionParser(data.description)}
                  </PostDescription>
               )}
               <URLContent data={data} />
            </RightPostContainer>
         </PostContainer>
      </Container>
   )
}

const Container = styled.div`
   border-radius: 16px;

   display: flex;
   flex-direction: column;
   background: #1e1e1e;

   span {
      color: #fff;
      display: flex;
      align-items: center;
      gap: 6px;

      padding: 6px 20px;

      font-family: Lato;
      font-size: 11px;
   }
`

const RepostIcon = styled(FaRetweet)`
   font-size: 20px;
`
