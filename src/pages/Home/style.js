import styled from "styled-components";

const Loader = styled.div`
  
  margin-top: 40px;
  margin-bottom: 80px;
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoaderTitle = styled.h3`

    font-size: 22px;
    color: #6d6d6d;
`;

export {
    Loader,
    LoaderTitle
}