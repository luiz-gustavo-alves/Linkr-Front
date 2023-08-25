import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";

export default function UserPage() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "",
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {
    
    userService.getPostsByUser(id, auth.authToken)
    .then(res => {

      if (res.data.length === 0) {
        navigate("/timeline");
      }

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