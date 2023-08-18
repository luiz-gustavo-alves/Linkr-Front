import userService from "../../services/user.service";

import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";
import useFetchTimeline from "../../hooks/useFetchTimeline";

export default function Home() {

  const { fetch } = useFetchTimeline();

  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: "Timeline",
    userPublish: true,
    defaultMessage: "Loading"
  })

  useEffect(() => {

    userService.getTimelinePosts()
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