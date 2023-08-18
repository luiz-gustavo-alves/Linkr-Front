import { useEffect, useState } from 'react'
import { Container, Title, Form, Input, InputButton, Link } from '../../assets/styles/Form.style'
import { RotatingLines } from 'react-loader-spinner'
import authService from '../../services/auth.service'

// import authService from '../../services/auth.service'

export default function Register() {

   useEffect(() => {

   }, [])

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

   const signUp = (e) => {
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
            <div>
               <h1>linkr</h1>
               <p>
                  save, share and discover <br /> the best links on the web
               </p>
            </div>
         </Title>

         <Form onSubmit={signUp}>
            <Input
               type="email"
               placeholder="e-mail"
               disabled={states.disabledInput}
               autoComplete="new-password"
               required
            />
            <Input
               type="password"
               placeholder="password"
               disabled={states.disabledInput}
               required
            />
            <Input type="text" placeholder="username" disabled={states.disabledInput} required />
            <Input type="url" placeholder="picture url" disabled={states.disabledInput} required />
            <InputButton type="submit" disabled={states.disabledInput}>
               {loading} Sign Up
            </InputButton>

            <Link href="#">Switch back to log in</Link>
         </Form>
      </Container>
   )
}
