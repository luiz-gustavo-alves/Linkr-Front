import styled from "styled-components";

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

export {
    Container,
    Content,
    Title
}