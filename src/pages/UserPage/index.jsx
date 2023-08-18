import postService from "../../services/posts.service";
import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";

export default function UserPage() {

  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "Juvenal",
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