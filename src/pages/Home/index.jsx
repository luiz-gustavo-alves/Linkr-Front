import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchTimeline from "../../hooks/useFetchTimeline";
import userService from "../../services/user.service";
import { AuthContext } from "../../contexts/auth.context";

export default function Home() {

  const { auth, isLogged } = useContext(AuthContext);
  const { fetch } = useFetchTimeline();

  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "Timeline",
    userPublish: true,
    defaultMessage: "Loading"
  })

  useEffect(() => {

    if (!isLogged()) {
      navigate("/");
      return;
    }

    userService.getTimelinePosts(auth.authToken)
      .then(res => {

        if (res.data.length === 0) {
          setPostDetails({...postDetails, defaultMessage: "There are no posts yet"});
        }
        setPostData(res.data);
      })
      .catch(() => setPostDetails({
          ...postDetails, 
          defaultMessage:"An error occured while trying to fetch the posts, please refresh the page"
        }));

  }, [fetch]);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}
