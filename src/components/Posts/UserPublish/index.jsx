import {
  Container,
  LeftContent,
  RightContent,
  FormContent,
  FormButtonContainer
} from "./style";

import {
  kirby 
} from "../../../assets/images";

import { useState } from "react";
import postService from "../../../services/posts.service";

export default function UserPublish ({ fetchTimeline }) {

  const [disabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({ URL: "", description: "" });

  function handleChange (e) {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  function handleSubmit (e) {
    e.preventDefault();
    setDisabled(true);

    postService.createPost(formData)
      .then(() => {
        setDisabled(false);
        setFormData({ URL: "", description: "" });
        fetchTimeline();
      })
      .catch(() => {
        alert("Houve um erro ao publicar seu link");
        setDisabled(false);
      });
  }

  return (
    <Container>
      <LeftContent>
        <img src={kirby} alt="profile" />
      </LeftContent>
      <RightContent>
        <h3>What are you going to share today?</h3>
        <FormContent onSubmit={handleSubmit}>
          <input
            type="text"
            name="URL"
            value={formData.URL}
            onChange={handleChange}
            disabled={disabled}
            placeholder="http://..."
          />
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            disabled={disabled}
            placeholder="Awesome article about #javascript"
          />
          <FormButtonContainer>
            <button type="submit" disabled={disabled}>
              {disabled ? "Publishing..." : "Publish"}
            </button>
          </FormButtonContainer>
        </FormContent>
      </RightContent>
    </Container>
  )
}