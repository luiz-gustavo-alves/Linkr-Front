import {
  Loader,
  LoaderTitle
} from "./style";

import {
  Posts
} from "../../components";

import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
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
    data: null,
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
          setPostDetails({...postDetails, 
          defaultMessage: "You don't follow anyone yet. Search for new friends!"});
        }

        /* Auto fetch posts if first timeline access or publish/update/delete/refresh posts */
        if (postData === null || postOption !== null) {
          setPostData(res.data);
          setNewPosts({
            data: res.data,
            value: false,
            counter: 0
          });
          updatePostOption(null);

          /* Count all TimelinePosts */
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
            const hashTable = {};
            for (let i = 0; i < newPosts.data.length; i++) {
              const postID = newPosts.data[i].postID;
              hashTable[postID] = true;
            }

            const newData = [];
            for (let i = 0; i < fetchPostData.length; i++) {
              const postID = fetchPostData[i].postID;
              if (!hashTable[postID]) {
                newData.push(fetchPostData[i]);
              } else {
                break;
              }
            }

            if (newData.length > 0) {

              setNewPosts({
                data: [...newData, ...newPosts.data],
                value: true,
                counter: newPosts.counter + newData.length
              });
            }
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

    updateLimit(limit + 10);
    updatePostOption("refresh");
    fetchTimeline();
  }

  return (
    <>
      <Posts
        data={postData}
        details={postDetails}
        newPosts={newPosts}
      />
      {postData && 
        <InfiniteScroll
          dataLength={postData.length} 
          next={fetchNewPosts}
          hasMore={(postData.length !== postCounter)}
          loader={
            <Loader>
              <RotatingLines
                strokeColor="#fff"
                strokeWidth="5"
                animationDuration="0.75"
                width="60"
              />
              <LoaderTitle>Loading more posts...</LoaderTitle>
            </Loader>
          }
        />
      }
    </>
  )
}

