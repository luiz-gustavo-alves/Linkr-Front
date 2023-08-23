import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchTimeline from "../../hooks/useFetchTimeline";
import useLimit from "../../hooks/useLimit.js";
import userService from "../../services/user.service";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuthContext } from "../../contexts/auth.context";

export default function Home() {

  const { auth, isLogged } = useContext(AuthContext);
  const { limit, resetLimit, updateLimit } = useLimit();
  const { fetch, fetchTimeline, postOption, updatePostOption } = useFetchTimeline();
  const [postCounter, setPostCounter] = useState(0);

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

        /* No posts in Database */
        if (res.data.length === 0) {
          setPostDetails({...postDetails, defaultMessage: "There are no posts yet"});
        }

        /* Auto fetch posts if first timeline access or publish/update/delete/refresh posts */
        if (postData === null || postOption !== null) {
          setPostData(res.data);
          updatePostOption(null);

          userService.countTimelinePosts()
            .then(res => {
              const { counter } = res.data;
              if (counter !== postCounter) {
                setPostCounter(counter);
              }
            })

        } else {

          const fetchPostData = res.data;

          /* Fetch posts if a different user deletes a post */
          if (fetchPostData[0].createdAt < postData[0].createdAt) {
            setPostData(res.data);
          }

          /* New posts in the timeline */
          else if (fetchPostData[0].createdAt > postData[0].createdAt) {

            userService.countTimelinePosts()
              .then(res => {

                const { counter } = res.data;

                setNewPosts({
                  value: true,
                  counter: counter - postData.length
                });
              })
              .catch(err => console.log(err));
          }
        }
      })
      .catch(() => setPostDetails({
          ...postDetails, 
          defaultMessage:"An error occured while trying to fetch the posts, please refresh the page"
        }));

      /* Interval (15 seconds) to check if there are new posts in the timeline */
      const interval = setInterval(() => {
        fetchTimeline();
      }, 1000 * 15);

      return () => clearInterval(interval);

  }, [fetch]);

  function fetchNewPosts() {

    const newLimit = limit + 10;
    console.log(newLimit);
    updateLimit(newLimit);
    setNewPosts({
      value: false,
      counter: newPosts.counter - newLimit
    });
    userService.getTimelinePosts(auth.authToken, newLimit)
      .then(res => setPostData(res.data));
  }

  return (
    <>
      <Posts
        data={postData}
        details={postDetails}
        newPosts={newPosts}
        setNewPosts={setNewPosts}
      />
      {postData && 
        <InfiniteScroll
          dataLength={postData.length} 
          next={fetchNewPosts}
          hasMore={(postData.length !== postCounter)}
          loader={<h4>Loading...</h4>}
        />
      }
    </>
  )
}
