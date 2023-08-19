import {
  Body,
  Container,
  Content,
  DivH1,
  HashtagsContainer,
  ListHashtags,
  PostsContainer,
  Title
} from "./style";

import UserPublish from "./UserPublish";
import DefaultPost from "../DefaultPost"
import PostContent from "./PostContent";
import React from "react";

import { useEffect, useState } from "react";
import useFetchTimeline from "../../hooks/useFetchTimeline";
import hashService from "../../services/hash.service";
import { useNavigate } from "react-router-dom";

export default function Posts({ data, details }) {

  const { fetchTimeline } = useFetchTimeline();
  const [showPosts, setShowPosts] = useState(false);

  useEffect(() => {

    if (!data) {
      return;
    }

    hashService.hashtagsList()
      .then(res => {
        setHashtags(res.data);
      })
      .catch((err) => console.log(err));
    
    (data.length > 0) ? setShowPosts(true) : setShowPosts(false);

  }, [ data ]);

  const [hashtags, setHashtags] = useState([{id:'',hashtag:'',cont:''}]);
  const navigate = useNavigate();

  const navigateToHashtag = (hashtag) => {
    const cleanedHashtag = hashtag.replace(/^#/, '');
    navigate(`/hashtag/${cleanedHashtag}`);
  };

  return (
    <Container>
      <Content>
        <Title>{details.title}</Title>
        <Body>
          <PostsContainer>
          {details.userPublish && 
            <UserPublish fetch={fetch} fetchTimeline={fetchTimeline} />
          }

          {!showPosts && 
            <DefaultPost message={details.defaultMessage} />
          }

          {showPosts && data.map((data) => (
              <PostContent key={data.postID} data={data} fetchTimeline={fetchTimeline} />
            ))
          }
          </PostsContainer>
          <HashtagsContainer>
            <DivH1>
              <h1>trending</h1>
            </DivH1>
            <ListHashtags>
              {hashtags.map((hash)=> 
                <h2 onClick={() => navigateToHashtag(hash.hashtag)} key={hash.id}> {hash.hashtag} </h2>
              )}
              
            </ListHashtags>
          </HashtagsContainer>
        </Body>
      </Content>
    </Container>
  )
}

