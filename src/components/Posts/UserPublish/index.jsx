import {
  Container,
  LeftContent,
  RightContent,
  FormContent,
  FormButtonContainer
} from "./style";

import { useContext, useState } from "react";
import { AuthContext } from '../../../contexts/auth.context'
import postService from "../../../services/posts.service";
import useFetchTimeline from "../../../hooks/useFetchTimeline";

export default function UserPublish() {
  
  const { fetchTimeline, updatePostOption } = useFetchTimeline();
  const { auth } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({ URL: "", description: "" });

  function handleChange (e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  function handleSubmit (e) {
    e.preventDefault();
    setDisabled(true);

    postService.createPost(formData, auth.authToken)
      .then(() => {
        setDisabled(false);
        setFormData({ URL: "", description: "" });
        fetchTimeline();
        updatePostOption("create");
      })
      .catch(() => {
        alert("Houve um erro ao publicar seu link");
        setDisabled(false);
      });
  }

  return (
    <Container data-test="publish-box">
      <LeftContent>
        <img src={auth.imageURL} alt="profile" />
      </LeftContent>
      <RightContent>
        <h3>What are you going to share today?</h3>
        <FormContent onSubmit={handleSubmit}>
          <input
            type="text"
            name="URL"
            data-test="link"
            value={formData.URL}
            onChange={handleChange}
            disabled={disabled}
            placeholder="http://..."
          />
          <textarea
            type="text"
            name="description"
            data-test="description"
            value={formData.description}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Awesome article about #javascript"
          />
          <FormButtonContainer>
            <button type="submit" data-test="publish-btn" disabled={disabled}>
              {disabled ? "Publishing..." : "Publish"}
            </button>
          </FormButtonContainer>
        </FormContent>
      </RightContent>
    </Container>
  )
}