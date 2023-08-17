import postService from "../../services/posts.service";
import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";

export default function HashtagPage() {

  const [postData, setPostData] = useState(null);

  useEffect(() => {

  }, []);

  const postDetails = {
    title: "Hashtag",
    userPublish: false
  }

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}