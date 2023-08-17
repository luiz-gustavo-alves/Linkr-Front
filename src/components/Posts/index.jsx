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

import {
  kirby,
  react
} from "../../assets/images";

import UserPublish from "./UserPublish";

export default function Posts({ data, details }) {

  return (
    <Container>
      <Content>

        <Title>{details.title}</Title>
        {details.userPublish && <UserPublish />}

        <PostContainer>
          <LeftPostContainer>
            <ProfilePicture src={kirby} />
            <LikeContainer>
              <LikeButton />
              <LikeCounter>0 likes</LikeCounter>
            </LikeContainer>
          </LeftPostContainer>

          <RightPostContainer>
            <PostTitle>Juvenal</PostTitle>
            <PostDescription>
              Muito maneiro esse tutorial de Material UI com React, deem uma olhada! <Hashtag>#react</Hashtag> <Hashtag>#material</Hashtag>
            </PostDescription>

            <URLContainer>
              <a href="https://medium.com/@pshrmn/a-simple-react-router" title="Como aplicar o Material UI em um projeto React">
                <URLContentContainer>
                  <URLDetails>
                    <URLTitle>Como aplicar o Material UI em um projeto React</URLTitle>
                    <URLDescription>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</URLDescription>
                    <URLContent>https://medium.com/@pshrmn/a-simple-react-router</URLContent>
                  </URLDetails>
                  <URLImageContainer>
                    <URLImage src={react} />
                  </URLImageContainer>
                </URLContentContainer>
              </a>
            </URLContainer>
          </RightPostContainer>
        </PostContainer>

        <PostContainer>
          <LeftPostContainer>
            <ProfilePicture src={kirby} />
            <LikeContainer>
              <LikeButton />
              <LikeCounter>0 likes</LikeCounter>
            </LikeContainer>
          </LeftPostContainer>

          <RightPostContainer>
            <PostTitle>Juvenal</PostTitle>
            <PostDescription>
              Muito maneiro esse tutorial de Material UI com React, deem uma olhada! <Hashtag>#react</Hashtag> <Hashtag>#material</Hashtag>
            </PostDescription>

            <URLContainer>
              <a href="https://medium.com/@pshrmn/a-simple-react-router" title="Como aplicar o Material UI em um projeto React">
                <URLContentContainer>
                  <URLDetails>
                    <URLTitle>Como aplicar o Material UI em um projeto React</URLTitle>
                    <URLDescription>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</URLDescription>
                    <URLContent>https://medium.com/@pshrmn/a-simple-react-router</URLContent>
                  </URLDetails>
                  <URLImageContainer>
                    <URLImage src={react} />
                  </URLImageContainer>
                </URLContentContainer>
              </a>
            </URLContainer>
          </RightPostContainer>
        </PostContainer>

      </Content>
    </Container>
  )
}