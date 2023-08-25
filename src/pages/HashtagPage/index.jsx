import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hashService from "../../services/hash.service";
import { AuthContext } from "../../contexts/auth.context";
import useFetchTimeline from "../../hooks/useFetchTimeline";

export default function HashtagPage() {

  const { hashtag } = useParams();
  const { auth } = useContext(AuthContext);
  const { fetch, postOption, updatePostOption } = useFetchTimeline();
  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: hashtag,
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {

    if (postOption !== null) {
      updatePostOption(null);
    }

    hashService.hashtagPosts(hashtag, auth.authToken)
    .then(res => {
      
      if (res.data.posts[0].allLikedUserIDs === null) {
        res.data.posts[0].allLikedUserIDs = "";
      }

      setPostData(res.data.posts);
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        title: res.data.hashtag
      }));
    })
    .catch(() => setPostDetails({
      ...postDetails, 
      defaultMessage:"An error occured while trying to fetch the posts, please refresh the page"
    }));

  }, [hashtag, fetch]);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}