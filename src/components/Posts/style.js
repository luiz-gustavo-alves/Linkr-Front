import styled from "styled-components";

import { AiOutlineHeart } from "react-icons/ai";

const Container = styled.main`

    margin: 40px 0;
`;

const Content = styled.div`

    display: flex;
    flex-direction: column;
    width: 612px;
    margin: 0 auto;
`;

const Title = styled.h2`

    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: 700;
    color: #FFF;
    margin-bottom: 50px;
`;

const PostContainer = styled.div`

    width: 100%;
    height: auto;
    display: flex;
    background-color: #000;
    border-radius: 10px;
    margin: 20px 0;
    padding: 20px;

    h3 {
        word-break: break-all;
    }
`;

const LeftPostContainer = styled.div`

    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfilePicture = styled.img`

    width: 50px;
    height: 50px;
    border-radius: 25px;
    object-fit: cover;
`;

const LikeContainer = styled.div`

    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 15px;
    align-items: center;
`;

const LikeButton = styled(AiOutlineHeart)`

    width: 20px;
    height: 20px;
    color: #FFF;
    cursor: pointer;
`;

const LikeCounter = styled.h3`

    font-size: 11px;
    font-weight: 400;
    color: #FFF;
`;

const RightPostContainer = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    gap: 15px;
`;

const PostTitle = styled.h3`

    font-size: 18px;
    color: #FFF;
`;

const PostDescription = styled.h3`

    font-size: 17px;
    color: #B7B7B7;
`;

const Hashtag = styled.span`

    font-weight: 600;
    color: #FFF;
    cursor: pointer;
`;

const URLContainer = styled.div`

    height: auto;
    border: 1px solid #4D4D4D;
    border-radius: 10px;
    cursor: pointer;
`;

const URLContentContainer = styled.div`

    display: flex;
`;

const URLDetails = styled.div`

    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px 15px;
    width: 65%;
`;

const URLTitle = styled.h3`

    font-size: 16px;
    line-height: 24px;
    color: #FFF;
`;

const URLDescription = styled.h3`

    font-size: 11px;
    line-height: 16px;
    color: #9B9595;
`;

const URLContent = styled.h3`

    font-size: 11px;
    line-height: 16px;
    color: #9B9595;
`;

const URLImageContainer = styled.div`
    
    display: flex;
    width: 35%;
    padding: 5px;
    align-items: center;
    justify-content: center;
`;

const URLImage = styled.img`

    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export {
    Container,
    Content,
    Title,
    PostContainer,
    LeftPostContainer,
    ProfilePicture,
    LikeContainer,
    LikeButton,
    LikeCounter,
    RightPostContainer,
    PostTitle,
    PostDescription,
    Hashtag,
    URLContainer,
    URLContentContainer,
    URLDetails,
    URLTitle,
    URLDescription,
    URLContent,
    URLImageContainer,
    URLImage
}