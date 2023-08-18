import postService from "../../services/posts.service";
import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function HashtagPage() {

  const { hashtag } = useParams();

  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: hashtag,
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {

  }, []);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}