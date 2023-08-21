import postService from "../../services/posts.service";
import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserPage() {
  
  const { id } = useParams();

  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "User",
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {
    
    userService.getPostsByUser(id)
    .then(res => {
      console.log(res.data);
      setPostData(res.data);
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        title: res.data[0].user.name
      }));
    })
    .catch((err) => console.log(err));
  }, []);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}