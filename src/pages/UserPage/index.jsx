import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import useFetchTimeline from "../../hooks/useFetchTimeline";

export default function UserPage() {

  const { pathname } = useLocation();
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

      const { user } = res.data[0];

      if (!user) {
        setPostData(res.data);
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          title: `${res.data[0].name} posts`,
          defaultMessage: "There are no posts yet from this user!"
        }));

      } else {
        setPostData(res.data);
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          title: `${res.data[0].user.name} posts`
        }));
      }
    })
    .catch((err) => {
      navigate("/timeline");
    });

  }, [fetch, pathname]);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}