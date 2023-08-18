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
  IconsContainer,
  EditIcon,
  DeleteIcon,
  PostDescription,
  Hashtag
} from "./style";

import URLContent from "../URLContent";
import React from "react";

export default function PostContent({ data }) {

  const postDescriptionParser = (description) => {
  
    const parser = description.split(' ').map((text, index) => {
      
      if (text.startsWith("#")) {
        return <Hashtag key={index} title={text}>{text} </Hashtag>
      } else {
        return <React.Fragment key={index}>{text} </React.Fragment>
      }
    });

    return parser;
  }

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
              <EditIcon /> 
              <DeleteIcon />
            </IconsContainer>
          }
        </RightPostTopContent>
        <PostDescription>{postDescriptionParser(data.description)}</PostDescription>
        <URLContent data={data} />
      </RightPostContainer>
    </PostContainer>
  )
}