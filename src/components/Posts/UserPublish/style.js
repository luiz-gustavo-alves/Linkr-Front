import styled from "styled-components";

const Container = styled.div`

    width: 100%;
    height: 210px;
    display: flex;
    background-color: #FFF;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
`;

const LeftContent = styled.div`

    width: 80px;
    height: 100%;
    display: flex;
    flex-direction: column;

    img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        object-fit: cover;
    }
`;

const RightContent = styled.div`

    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    h3 {
        font-size: 20px;
        font-weight: 300;
        color: #707070;
    }
`;

const FormContent = styled.form`

    display: flex;
    flex-direction: column;
    gap: 7px;
   
    input {
        width: 100%;
        height: 30px;
        border: none;
        outline: none;
        border-radius: 7px;
        background-color: #EFEFEF;
        padding: 5px 10px;
        font-family: 'Lato', sans-serif;
        font-size: 15px;
        color: #949494;

        &::placeholder {
            font-size: 15px;
            color: #949494;
        }
    }

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

        &::placeholder {
            font-size: 15px;
            color: #949494;
        }
    }
`

const FormButtonContainer = styled.div`

    display: flex;
    justify-content: flex-end;

    button {
        width: 110px;
        height: 30px;
        border: none;
        outline: none;
        background-color: #1877F2;
        border-radius: 5px;
        font-weight: 700;
        color: #FFF;
        cursor: pointer;
        transition: all .2s;

        &:hover {
            opacity: 0.7
        }
    }
`;

export {
    Container,
    LeftContent,
    RightContent,
    FormContent,
    FormButtonContainer
}