import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UserPage() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "",
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {
    
    userService.getPostsByUser(id)
    .then(res => {
      setPostData(res.data);
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        title: `${res.data[0].user.name} posts`
      }));
    })
    .catch((err) => {
      navigate("/timeline");
    });

  }, []);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}