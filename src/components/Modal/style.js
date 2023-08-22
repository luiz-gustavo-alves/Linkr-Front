import styled from "styled-components";

const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.85);
    z-index: 1000;
`;

const Content = styled.div`
    
    width: 600px;
    height: 275px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    align-items: center;
    background-color: #333333;
    border-radius: 40px;
    padding: 40px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1001;
`;

const Title = styled.h2`

    padding: 0 75px;
    text-align: center;
    font-size: 34px;
    line-height: 44px;
    font-weight: 700;
    color: #FFF;
`;

const ButtonsContainer = styled.div`

    width: 60%;
    height: 40px;
    display: flex;
    justify-content: space-between;
`;

const ReturnButton = styled.button`

    width: 135px;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #FFF;
    color: #1877F2;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        opacity: 0.9;
    }
`;

const DeleteButton = styled.button`

    width: 135px;
    border: none;
    outline: none;
    border-radius: 5px;
    background-color: #1877F2;
    color: #FFF;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    transition: all .2s;

    &:hover {
        opacity: 0.9;
    }
`;

const Loader = styled.div`

    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export {
    Container,
    Content,
    Title,
    ButtonsContainer,
    ReturnButton,
    DeleteButton,
    Loader
}