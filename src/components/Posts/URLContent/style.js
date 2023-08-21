import styled from "styled-components";

const URLContainer = styled.div`

    height: auto;
    border: 1px solid #4D4D4D;
    border-radius: 10px;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        opacity: 0.8;
    }
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

    @media (max-width: 420px) {
        gap: 5px;
        padding: 10px 8px;
    }
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
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;  
    text-overflow: ellipsis;
    overflow: hidden;
`;

const URL = styled.h3`

    font-size: 11px;
    line-height: 16px;
    color: #9B9595;
    word-break: break-all;
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
    URLContainer,
    URLContentContainer,
    URLDetails,
    URLTitle,
    URLDescription,
    URL,
    URLImageContainer,
    URLImage
}