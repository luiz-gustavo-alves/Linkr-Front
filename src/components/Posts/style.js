import styled from "styled-components";
import { BiRefresh } from 'react-icons/bi';

const Container = styled.main`

    margin: 40px 0;
`;

const Content = styled.div`

    display: flex;
    flex-direction: column;
    width: 938px;
    margin: 0 auto;

    @media (max-width: 938px) {
      width: 100%;
    }
`;

const Title = styled.h2`
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: 700;
    color: #FFF;
    margin-bottom: 50px;
    
    @media (max-width: 938px) {
      font-size: 33px;
      padding: 0 20px;
    }
`;

const NewPostsContainer = styled.div`

    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    button {
        width: 100%;
        height: 60px;
        border: none;
        outline: none;
        background-color: #1877F2;
        border-radius: 5px;
        font-size: 18px;
        font-weight: 700;
        color: #FFF;
        cursor: pointer;
        transition: all .2s;

        &:hover {
            opacity: 0.7
        }
    }
    
    position: relative;
`;

const RefreshIcon = styled(BiRefresh)`

  color: #fff;
  height: 32px;
  width: 32px;
  position: absolute;
  top: 14px;
  right: 160px;

  @media (max-width: 938px) {
      right: 14px;
    }
`;

export {
    Container,
    Content,
    Title,
    NewPostsContainer,
    RefreshIcon
}

export const Body = styled.div`
  width: 100%;
  display: flex;
`
export const PostsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 38px;
  width: 612px;

  @media (max-width: 938px) {
    width: 100%;
  }
`
export const HashtagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 301px;
  height: 100%;
  background-color: #171717;
  color: #FFFFFF;
  border-radius: 15px;
  margin-left: 25px;

  @media (max-width: 938px) {
    display: none;
  }
`
export const DivH1 = styled.div`
  width: 301px;
  padding: 15px;
  border-bottom: solid 1px #484848;
  border-radius: 15px 15px 0 0;
  h1{
    font-size: 27px;
    font-weight: 700;
  }
`
export const ListHashtags = styled.div`
  width: 301px;
  padding: 12px 15px 0;
  border-radius: 0 0 15px 15px;
  h2{
    font-size: 19px;
    margin-bottom: 12px;
    cursor: pointer;
  }
`