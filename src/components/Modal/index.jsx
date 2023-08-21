import {
  Container,
  Content,
  Title,
  ButtonsContainer,
  ReturnButton,
  DeleteButton,
  Loader
} from "./style";

import { useState } from "react";
import { RotatingLines } from 'react-loader-spinner'
import useFetchTimeline from "../../hooks/useFetchTimeline";
import postService from "../../services/posts.service";

export default function Modal({ setOpenModal, token, postID }) {

  const [loading, setLoading] = useState(false);
  const { fetchTimeline } = useFetchTimeline();

  function deletePost () {

    setLoading(true);
    
    postService.deletePost(postID, token)
      .then(() => {
        setOpenModal(false);
        setLoading(false);
        fetchTimeline();
      })
      .catch(() => {
        alert("Não foi possível excluir a postagem.");
        setOpenModal(false);
        setLoading(false);
      })
  }

  return (
    <Container>
      <Content>

        {!loading &&
          <>
          <Title>Are you sure you want to delete this post?</Title>
            <ButtonsContainer>
              <ReturnButton data-test="cancel" onClick={() => setOpenModal(false)}>No, go back</ReturnButton>
              <DeleteButton data-test="confirm" onClick={deletePost}>Yes, delete it</DeleteButton>
            </ButtonsContainer>
          </>
        }

        {loading &&
          <Loader>
            <RotatingLines
              strokeColor="#fff"
              strokeWidth="5"
              animationDuration="0.75"
              width="100"
            />
          </Loader>
        }
        
      </Content>
    </Container>
  )
}