import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { AuthContext } from "../../../contexts/auth.context";
import userService from "../../../services/user.service";

export default function TitleUser({ name, photo }) {
    const { pathname } = useLocation();
    const { id } = useParams();
    const { auth } = useContext(AuthContext);
    const [followed, setFollowed] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(()=>{
        userService.checkFollow(auth.authToken, id)
            .then((res)=>{
                setFollowed(res.data.followed);
            })
            .catch((err)=>{
                console.log(err);
            })
    }, []);

    const setTitleDataTest = () => {
        if (pathname.includes("/hashtag")) {
            return "hashtag-title";
        }
        return "";
    }

    const titleDataTest = setTitleDataTest();

    const handleButtonClick = () => {        
        setDisabled(true);
        userService.postFollow(auth.authToken, id)
            .then((res)=>{
                setFollowed(res.data.followed);
                setDisabled(false);
            })
            .catch((err)=>{
                setDisabled(false);
            })
      };

    return (
        <DivTitle>
            <div>
                <StyledImg src={photo} />
                <Title data-test={titleDataTest}>{name}</Title>
            </div>
            <StyledButton followed={followed} onClick={handleButtonClick} disabled={disabled} >
                {followed ? 'Unfollow' : 'Follow'}
            </StyledButton>
        </DivTitle>
    );
}

const DivTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 50px;

    div{
        display: flex;
        align-items: center;
    }

    h2{
        margin: 0;
    }
`;

const StyledImg = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-right: 15px;
    object-fit: cover;

    @media (max-width: 938px) {
        width: 40px;
        height: 40px;
    }
`

const StyledButton = styled.button`
    width: 132px;
    height: 31px;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: ${({ followed }) => (followed ? '#1877F2' : '#FFFFFF')};
    background-color: ${({ followed }) => (followed ? '#FFFFFF' : '#1877F2')};
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`

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