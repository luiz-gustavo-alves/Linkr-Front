import {
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

   function handleContentTooltip() {
      const likes = Number(currentPostData.likes)
      const lastLikes = []
      const userLiked = currentPostData.allLikedUserIDs.includes(currentUserID)

      currentPostData['lastLikes'].forEach((like) => {
         if (like.id !== currentUserID) {
            lastLikes.push(like.name)
         }
      })

      switch (true) {
         case likes === 0:
            return 'Não há curtidas!'

         case likes === 1:
            if (userLiked) {
               return `Você e outras ${likes - 1} curtiram esse post.`
            }
            if (lastLikes[1] === undefined) {
               return `${lastLikes[0] ?? 'Você'} e outras ${likes - 1} curtiram esse post.`
            }

            return `${lastLikes[1] ?? 'Você'} e outras ${likes - 1} curtiram esse post.`


         case likes >= 2:
            if (userLiked) {
               return `Você, ${lastLikes[0] ?? 'Você'} e outras ${likes - 2} curtiram esse post.`
            }

            if (lastLikes[0] === undefined) {
               return `${lastLikes[0] ?? 'Você'}, ${lastLikes[1] ?? 'Você'} e outras ${
                  likes - 2
               } curtiram esse post.`
            }
            return `${lastLikes[1] ?? 'Você'}, ${lastLikes[0] ?? 'Você'} e outras ${
               likes - 2
            } crutiram esse post.`

         default:
            break
      }
   }

   function handleLike(postID) {
      userService
         .postLike({ token: auth.authToken, postID })
         .then((response) => {
            setCurrentPostData({ ...data, likes: response.data.currentLikes })
            setLiked(!liked)
            fetchTimeline()
         })
         .catch((error) => console.log(error))
   }

   const [showComments, setShowComments] = useState(false);
   const [userComment, setUserComment] = useState({ comment: "" });

   function toggleComments() {
      setShowComments(!showComments)
   }

   function handleComment (e) {
      setUserComment({...userComment, [e.target.name]: e.target.value})
   }

   function handleCommentSubmit (e) {
      e.preventDefault();

      const payload = {
         userID_owner: data.user.id,
         postID: data.postID,
         comment: userComment.comment
      }

      userService.postComment(payload, auth.authToken)
         .then(() => {
            setUserComment({comment: ""});
            updatePostOption("comment");
            fetchTimeline();
         })
         .catch(err => console.log(err));
   }

   const setPostComments = () => {

      return (
         <>
            <CommentsContainer data-test="comment-box">
               {data.comments.map(element => {

                  let commentType;
                  if (element.type === "follower") {
                     commentType = "• following";
                  } else if (element.type === "owner") {
                     commentType = "• post’s author"
                  } else {
                     commentType = "";
                  }

                  return (
                     <CommentContent key={element.commentID} data-test="comment">
                        <div className="commentLeftContent">
                           <img src={element.user.img} alt={element.user.name} />
                        </div>
                        <div className="commentRightContent">
                           <div className="commentUserDetails">
                              <h2>{element.user.name}</h2>
                              <h3>{commentType}</h3>
                           </div>
                           <div className="comment">
                              <h3>{element.comment}</h3>
                           </div>
                        </div>
                     </CommentContent>
                  )
               })}
            </CommentsContainer>
            <UserCommentContainer>
               <div className="userLeftCommentContainer">
                  <img src={auth.imageURL} />
               </div>
               <form className="userRightCommentContainer" onSubmit={handleCommentSubmit}>
                  <input
                     type="text"
                     name="comment"
                     data-test="comment-input"
                     value={userComment.comment}
                     onChange={handleComment}
                     placeholder="write a comment..."
                  />
                  <button type="submit" data-test="comment-submit">
                     <SendCommentIcon />
                  </button>
               </form>
            </UserCommentContainer>
         </>
      )
   }

   const postComments = setPostComments();

   return (
      <Container>
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
               <PostOptions>
                  <div className="options">
                     <LikeIcon
                        data-test="like-btn"
                        onClick={() => handleLike(currentPostData.postID)}
                        clicked={currentPostData.allLikedUserIDs.includes(currentUserID).toString()}
                        liked={liked.toString()}
                     />
                     <Counter data-test="counter" id={`anchorTooltip-${currentPostData.postID}`}>
                        {currentPostData.likes} likes
                     </Counter>
                  </div>
                  <div className="options">
                     <CommentIcon 
                        data-test="comment-btn"
                        onClick={toggleComments}
                     />
                     <Counter data-test="comment-counter">
                        {data.comments.length} comments
                     </Counter>
                  </div>
               </PostOptions>

               <Tooltip
                  data-test="tooltip"
                  place="bottom"
                  className="tooltip"
                  anchorSelect={`#anchorTooltip-${currentPostData.postID}`}
                  content={handleContentTooltip}
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
         
         {showComments && postComments}
      </Container>
   )
}
