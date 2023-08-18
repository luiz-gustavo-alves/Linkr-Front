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
} from "./style";

import URLContent from "../URLContent";

import React, { useState, useEffect } from "react";
import postService from "../../../services/posts.service";

export default function PostContent({ data, fetchTimeline }) {

  const [disabled, setDisabled] = useState(false);
  const [editPost, setEditPost] = useState(false);
  const [formData, setFormData] = useState({
    description: data.description,
    URL: data.URL,
    postID: data.postID
  });

  function toggleEditPost () {
    (editPost) ? setEditPost(false) : setEditPost(true);
  }

  function handleChange (e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  function handleSubmit (e) {

    if (e.key === 'Enter' && !disabled) {

      setDisabled(true);

      const payload = {
        description: formData.description,
        URL: formData.URL
      }

      postService.updatePost(payload, formData.postID)
        .then(() => {
          setEditPost(false);
          setDisabled(false);
          setFormData({
            description: payload.description,
            URL: payload.URL,
            postID: formData.postID
          });
          fetchTimeline();
        })
        .catch(() => {
          alert("Houve um erro ao atualizar a postagem");
          setDisabled(false);
        });
    }
  }

  function postDescriptionParser (description) {

    const parser = description.split(' ').map((text, index) => {
      
      if (text.startsWith("#")) {
        return <Hashtag key={index} title={text}>{text} </Hashtag>
      } else {
        return <React.Fragment key={index}>{text} </React.Fragment>
      }
    });

    return parser;
  }

  function handleFocus (e) {
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
      });
    }

    const handleEsc = (e) => {

      if (e.key === 'Escape') {
        setEditPost(false);
        setFormData({
          description: data.description,
          URL: data.URL
        })
      }
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };

  }, [editPost]);

  return (
    <PostContainer>
      <LeftPostContainer>
        <ProfilePicture src={data.user.img} />
        <LikeContainer>
          <LikeIcon /> 
          <LikeCounter>{data.likes} likes</LikeCounter>
        </LikeContainer>
      </LeftPostContainer>

      <RightPostContainer>
        <RightPostTopContent>
          <PostTitle>{data.user.name}</PostTitle>
          {data.postOwner &&
              <IconsContainer>
                <EditIcon onClick={toggleEditPost}/> 
                <DeleteIcon />
              </IconsContainer>
          }
        </RightPostTopContent>
        {(editPost) ?
            <EditPostForm>
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                disabled={disabled}
                autoFocus
                onFocus={handleFocus}
                onKeyDown={handleSubmit}
              />
            </EditPostForm>
          :
          <PostDescription>{postDescriptionParser(data.description)}</PostDescription>
        }
        <URLContent data={data} />
      </RightPostContainer>
    </PostContainer>
  )
}