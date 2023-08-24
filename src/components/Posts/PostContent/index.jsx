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

   const [usersLiked, setUsersLiked] = useState([])
   const contentTooltip = usersLiked.length === 0 ? 'Não há curtidas!' : usersLiked
   const [liked, setLiked] = useState(false)

   function handleLike(postID) {
      userService
         .postLike({ token: auth.authToken, postID })
         .then((response) => {
            setLiked(response.data.liked)
            setUsersLiked([...usersLiked, data.lastLikes])
            updatePostOption('like')
            fetchTimeline()
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
               <ProfilePicture src={data.user.img} onClick={() => goToUser(data.user.id)} />
               <LikeContainer id="anchorTooltip">
                  <LikeIcon
                     data-test="like-btn"
                     clicked={liked.toString()}
                     onClick={() => handleLike(data.postID)}
                  />
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
