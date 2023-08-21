import {
  Container,
  DefaultMessage
} from "./style";

export default function DefaultPost({ message }) {

  return (
    <Container>
      <DefaultMessage data-test="message">
        {message}
      </DefaultMessage>
    </Container>
  )
}