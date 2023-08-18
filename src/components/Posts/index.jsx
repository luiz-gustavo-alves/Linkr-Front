import {
  Container,
  Content,
  Title,
  PostContainer,
  LeftPostContainer,
  ProfilePicture,
  LikeContainer,
  LikeButton,
  LikeCounter,
  RightPostContainer,
  PostTitle,
  PostDescription,
  Hashtag,
  URLContainer,
  URLContentContainer,
  URLDetails,
  URLTitle,
  URLDescription,
  URLContent,
  URLImageContainer,
  URLImage
} from "./style";

import UserPublish from "./UserPublish";
import DefaultPost from "../DefaultPost"
import React from "react";

import { useEffect, useState } from "react";

export default function Posts({ data, details }) {

  const [showPosts, setShowPosts] = useState(false);

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

  useEffect(() => {

    if (!data) {
      return;
    }

    (data.length > 0) ? setShowPosts(true) : setShowPosts(false);

  }, [ data ]);

  return (
    <Container>
      <Content>

        <Title>{details.title}</Title>
        {details.userPublish && <UserPublish />}

        {!showPosts && <DefaultPost message={details.defaultMessage} />}

        {showPosts && data.map((data, index) => (
          <PostContainer key={index}>
            <LeftPostContainer>
              <ProfilePicture src={data.imageURL} />
              <LikeContainer>
                <LikeButton />
                <LikeCounter>{data.likesCount} likes</LikeCounter>
              </LikeContainer>
            </LeftPostContainer>

            <RightPostContainer>
              <PostTitle>{data.name}</PostTitle>
              <PostDescription key={index}>{postDescriptionParser(data.description)}</PostDescription>

              <URLContainer>
                <a href={data.URL} title={data.URL_title} target="blank">
                  <URLContentContainer>
                    <URLDetails>
                      <URLTitle>{data.URL_title}</URLTitle>
                      <URLDescription>{data.URL_description}</URLDescription>
                      <URLContent>{data.URL}</URLContent>
                    </URLDetails>
                    <URLImageContainer>
                      <URLImage src={data.URL_image} />
                    </URLImageContainer>
                  </URLContentContainer>
                </a>
              </URLContainer>
            </RightPostContainer>
          </PostContainer>
        ))}

      </Content>
    </Container>
  )
}