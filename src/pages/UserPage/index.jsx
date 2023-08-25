import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import useFetchTimeline from "../../hooks/useFetchTimeline";

export default function UserPage() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { fetch, postOption, updatePostOption } = useFetchTimeline();
  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "",
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {

    if (postOption !== null) {
      updatePostOption(null);
    }
    
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

  }, [fetch]);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}