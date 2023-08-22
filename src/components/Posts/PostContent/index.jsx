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

export default function PostContent({ data, setPostData, fetchTimeline }) {
   const { auth } = useContext(AuthContext)

   const [disabled, setDisabled] = useState(false)
   const [editPost, setEditPost] = useState(false)
   const [openModal, setOpenModal] = useState(false)
   const [currentPostID, setCurrentPostID] = useState(false)

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

   const [usersLiked, setUsersLiked] = useState([])
   const contentTooltip = usersLiked.length === 0 ? 'Não há curtidas!' : usersLiked;
   const [liked, setLiked] = useState(false) 

   function handleLike(postID) {

    const { authToken } = JSON.parse(localStorage.getItem('auth'))
    userService.postLike({token: authToken, postID })
    .then(response => {
      setLiked(response.data.liked)
      setUsersLiked([...usersLiked, data.lastLikes])
    })
    .catch(error => console.log(error))
    
   }

   return (
      <PostContainer data-test="post">
         {openModal && (
            <Modal setOpenModal={setOpenModal} token={auth.authToken} postID={currentPostID} />
         )}

         <LeftPostContainer>
            <ProfilePicture src={data.user.img} onClick={() => goToUser(data.user.id)}/>
            <LikeContainer id='anchorTooltip'>
               <LikeIcon data-test="like-btn" clicked={liked.toString()} onClick={() => handleLike(data.postID)}/>
               <LikeCounter data-test="counter">{data.likes} likes</LikeCounter>
            </LikeContainer>
            <Tooltip
              data-test="tooltip"
               place="bottom"
               className="tooltip"
               anchorSelect="#anchorTooltip"
               content={contentTooltip}
            />
         </LeftPostContainer>

         <RightPostContainer>
            <RightPostTopContent>
               <PostTitle data-test="username" onClick={() => goToUser(data.user.id)}>
                  {data.user.name}
               </PostTitle>
               {data.postOwner && (
                  <IconsContainer>
                     <EditIcon data-test="edit-btn" onClick={toggleEditPost} />
                     <DeleteIcon data-test="delete-btn" onClick={() => handleModal(data.postID)} />
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
   )
}
