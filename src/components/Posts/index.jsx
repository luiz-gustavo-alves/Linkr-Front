import {
  Container,
  Content,
  Title
} from "./style";

import UserPublish from "./UserPublish";
import DefaultPost from "../DefaultPost"
import PostContent from "./PostContent";
import React from "react";

import { useEffect, useState } from "react";
import useFetchTimeline from "../../hooks/useFetchTimeline";

export default function Posts({ data, details }) {

  const { fetchTimeline } = useFetchTimeline();
  const [showPosts, setShowPosts] = useState(false);

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

        {details.userPublish && 
          <UserPublish fetch={fetch} fetchTimeline={fetchTimeline} />
        }

        {!showPosts && 
          <DefaultPost message={details.defaultMessage} />
        }

        {showPosts && data.map((data) => (
            <PostContent key={data} data={data} />
          ))
        }
      </Content>
    </Container>
  )
}