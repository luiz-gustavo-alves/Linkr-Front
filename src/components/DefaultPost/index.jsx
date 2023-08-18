import {
  Container,
  DefaultMessage
} from "./style";

export default function DefaultPost({ message }) {

  return (
    <Container>
      <DefaultMessage>
        {message}
      </DefaultMessage>
    </Container>
  )
}