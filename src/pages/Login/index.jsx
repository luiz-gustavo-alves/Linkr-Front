import { useState } from 'react'
import { Container, Title, Form, Input, InputButton, Link } from '../../assets/styles/Form.style'
import { RotatingLines } from 'react-loader-spinner'

// import authService from '../../services/auth.service'

export default function Login() {
   const [states, setStates] = useState({
      loadingVisibility: false,
      disabledInput: false,
      loadingColor: 'white'
   })
   const loading = (
      <RotatingLines
         strokeColor={states.loadingColor}
         strokeWidth="5"
         animationDuration="0.75"
         width="22"
         visible={states.loadingVisibility}
      />
   )

   const signIn = (e) => {
      e.preventDefault()

      setStates({
         disabledInput: !states.disabledInput,
         loadingVisibility: !states.loadingVisibility,
         loadingColor: 'grey'
      })
   }

   return (
      <Container>
         <Title>
            <h1>linkr</h1>
            <p>
               save, share and discover <br /> the best links on the web
            </p>
         </Title>

         <Form onSubmit={signIn}>
            <Input type="email" placeholder="e-mail" disabled={states.disabledInput} required />
            <Input
               type="password"
               placeholder="password"
               disabled={states.disabledInput}
               required
            />
            <InputButton type="submit" disabled={states.disabledInput}>
               {loading} Log In
            </InputButton>

            <Link href="#">First time? Create an account!</Link>
         </Form>
      </Container>
   )
}
