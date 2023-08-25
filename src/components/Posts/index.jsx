import {
  Body,
  Container,
  Content,
  DivH1,
  HashtagsContainer,
  ListHashtags,
  PostsContainer,
  Title,
  NewPostsContainer,
  RefreshIcon
} from "./style";

import UserPublish from "./UserPublish";
import DefaultPost from "../DefaultPost"
import PostContent from "./PostContent";
import TitleUser from "./TitleUser";
import React from "react";

import { useEffect, useState } from "react";
import hashService from "../../services/hash.service";
import { useLocation, useNavigate } from "react-router-dom";
import useLimit from "../../hooks/useLimit";
import useFetchTimeline from "../../hooks/useFetchTimeline";

export default function Posts({ data, details, newPosts }) {

  /* Default value for hashtag/user page */
  if (!newPosts) {
    newPosts = {value: false};
  }

  const { updateLimit } = useLimit();
  const { fetchTimeline, updatePostOption } = useFetchTimeline();
  const { pathname } = useLocation();
  const [showPosts, setShowPosts] = useState(false);
  const [photo, setPhoto] = useState();

  useEffect(() => {

    if (!data) {
      return;
    }

    if (pathname.includes("/user") && !pathname.includes("/hashtag")) {
      setPhoto(data[0].user.img);
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

  const getNewTimelinePosts = () => {
    updateLimit(newPosts.counter + data.length);
    updatePostOption("refresh");
    fetchTimeline();
  }

  const navigateToHashtag = (hashtag) => {
    const cleanedHashtag = hashtag.replace(/^#/, '');
    navigate(`/hashtag/${cleanedHashtag}`);
  };

  const setTitleDataTest = () => {
    if (pathname.includes("/hashtag")) {
        return "hashtag-title";
    }
    return "";
}

  const titleDataTest = setTitleDataTest(); 

  return (
    <Container>
      <Content>
        {
          (pathname == '/timeline' || pathname.startsWith('/hashtag')) ?
          <Title data-test={titleDataTest}>{details.title}</Title>
          :
          <TitleUser name={details.title} photo={photo} />
        }
        <Body>
          <PostsContainer>

          {details.userPublish && 
            <UserPublish />
          }

          {newPosts.value &&
            <NewPostsContainer>
              <button data-test="load-btn" onClick={getNewTimelinePosts}>{newPosts.counter} new posts, load more!</button>
              <RefreshIcon />
            </NewPostsContainer>
          }

          {!showPosts && 
            <DefaultPost message={details.defaultMessage} />
          }

          {showPosts && data.map((data) => (
              <PostContent key={data.postID} data={data} 
              />
            ))
          }
          </PostsContainer>
          <HashtagsContainer data-test="trending">
            <DivH1>
              <h1>trending</h1>
            </DivH1>
            <ListHashtags>
              {hashtags.map((hash)=> 
                <h2 data-test="hashtag" onClick={() => navigateToHashtag(hash.hashtag)} key={hash.id}> {hash.hashtag} </h2>
              )}
              
            </ListHashtags>
          </HashtagsContainer>
        </Body>
      </Content>
    </Container>
  )
}

