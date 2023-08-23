import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchTimeline from "../../hooks/useFetchTimeline";
import useLimit from "../../hooks/useLimit.js";
import userService from "../../services/user.service";
import { AuthContext } from "../../contexts/auth.context";

export default function Home() {

  const { auth, isLogged } = useContext(AuthContext);
  const { limit, resetLimit } = useLimit();
  const { fetch, fetchTimeline, option, updatePostOption } = useFetchTimeline();

  const navigate = useNavigate();
  const [newPosts, setNewPosts] = useState({
    value: false,
    counter: 0
  });
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

    let currentLimit = limit;
    if (postData === null) {
      resetLimit();
      currentLimit = 10;
    }

    userService.getTimelinePosts(auth.authToken, currentLimit)
      .then(res => {

        if (res.data.length === 0) {
          setPostDetails({...postDetails, defaultMessage: "There are no posts yet"});
        }

        if (postData === null || option !== null) {
          setPostData(res.data);
          updatePostOption(null);

        } else {

          const fetchPostData = res.data;
          if (fetchPostData[0].createdAt > postData[0].createdAt) {
            
            userService.countTimelinePosts()
              .then(res => {

                const { counter } = res.data;

                setNewPosts({
                  value: true,
                  counter: counter - postData.length
                });
              })
          }
        }
      })
      .catch(() => setPostDetails({
          ...postDetails, 
          defaultMessage:"An error occured while trying to fetch the posts, please refresh the page"
        }));

        const interval = setInterval(() => {
          fetchTimeline();
        }, 1000 * 15);

        return () => clearInterval(interval);

  }, [fetch]);

  console.log(postData);

  return (
    <Posts
      data={postData}
      details={postDetails}
      newPosts={newPosts}
      setNewPosts={setNewPosts}
    />
  )
}
