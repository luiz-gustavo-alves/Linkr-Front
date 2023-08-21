import {
  Posts
} from "../../components";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import hashService from "../../services/hash.service";

export default function HashtagPage() {

  const { hashtag } = useParams();

  const [postData, setPostData] = useState(null);
  const [postDetails, setPostDetails] = useState({
    title: hashtag,
    userPublish: false,
    defaultMessage: "Loading"
  })

  useEffect(() => {
    hashService.hashtagPosts(hashtag)
    .then(res => {
      setPostData(res.data[0].posts);
      setPostDetails((prevDetails) => ({
        ...prevDetails,
        title: res.data[0].hashtag
      }));
      
    })
    .catch(() => setPostDetails({
      ...postDetails, 
      defaultMessage:"An error occured while trying to fetch the posts, please refresh the page"
    }));

  }, [hashtag]);

  return (
    <Posts 
      data={postData}
      details={postDetails}
    />
  )
}