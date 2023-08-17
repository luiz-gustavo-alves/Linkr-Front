import postService from "../../services/posts.service";
import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";

export default function Home() {

  const [postData, setPostData] = useState(null);

  useEffect(() => {

  }, []);

  const postDetails = {
    title: "Timeline",
    userPublish: true
  }

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}