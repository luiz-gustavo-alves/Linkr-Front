import postService from "../../services/posts.service";
import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hashService from "../../services/hash.service";

export default function HashtagPage() {

  const { hashtag } = useParams();

  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: hashtag,
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {
    hashService.hashtagPosts(hashtag)
    .then(res => {
      console.log(res.data[0]);
      setPostData(res.data[0].posts);
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        title: res.data[0].hashtag
      }));
      
    })
    .catch((err) => console.log(err));
  }, [hashtag]);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}