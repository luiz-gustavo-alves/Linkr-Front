import styled from "styled-components";

import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { BsTrash } from "react-icons/bs";

const PostContainer = styled.div`

    width: 100%;
    height: auto;
    display: flex;
    background-color: #000;
    border-radius: 10px;
    margin-bottom: 40px;
    padding: 20px;
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

const LikeIcon = styled(AiOutlineHeart)`

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

const RightPostTopContent = styled.div`

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PostTitle = styled.h3`

    font-size: 18px;
    color: #FFF;
`;

const EditPostForm = styled.form`

    width: 100%;

    textarea {
        width: 100%;
        height: 68px;
        resize: none;
        border: none;
        outline: none;
        border-radius: 7px;
        background-color: #EFEFEF;
        padding: 10px;
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        color: #949494;
    }
`;

const IconsContainer = styled.div`

    display: flex;
    align-items: center;
    gap: 20px;
`;

const EditIcon = styled(HiOutlinePencilAlt)`

    width: 25px;
    height: 25px;
    color: #FFF;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        opacity: 0.8;
    }
`;

const DeleteIcon = styled(BsTrash)`

    width: 25px;
    height: 25px;
    color: #FFF;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        opacity: 0.8;
    }
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

export {
    PostContainer,
    LeftPostContainer,
    ProfilePicture,
    LikeContainer,
    LikeIcon,
    LikeCounter,
    RightPostContainer,
    RightPostTopContent,
    PostTitle,
    EditPostForm,
    IconsContainer,
    EditIcon,
    DeleteIcon,
    PostDescription,
    Hashtag
}