import {
  Container,
  LeftContent,
  RightContent,
  FormContent,
  FormButtonContainer
} from "./style";

import {
  kirby 
} from "../../../assets/images";

export default function UserPublish () {

  return (
    <Container>
      <LeftContent>
        <img src={kirby} alt="profile" />
      </LeftContent>
      <RightContent>
        <h3>What are you going to share today?</h3>
        <FormContent>
          <input 
            placeholder="http://..."
          />
          <textarea 
            placeholder="Awesome article about #javascript"
          />
          <FormButtonContainer>
            <button>Publish</button>
          </FormButtonContainer>
        </FormContent>
      </RightContent>
    </Container>
  )
}