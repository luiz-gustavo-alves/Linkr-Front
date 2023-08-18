import { useState, useEffect, useContext } from 'react'
import { Container, Title, Form, Input, InputButton, Link } from '../../assets/styles/Form.style'
import { useNavigate } from 'react-router-dom'
import authService from '../../services/auth.service'
import { AuthContext } from '../../contexts/auth.context'
import { FormsContext } from '../../contexts/forms.context'
import BannerSign from '../../components/BannerSign/BannerSign'

export default function Login() {
   const navigate = useNavigate()

   const { isLogged, persistenceLogin } = useContext(AuthContext)
   const { states, setStates, loading } = useContext(FormsContext)

   useEffect(() => {
      isLogged()
   }, [])

   const [form, setForm] = useState({
      email: '',
      password: ''
   })

   const handleSignIn = (e) => {
      e.preventDefault()

      setStates({
         disabledInput: !states.disabledInput,
         loadingVisibility: !states.loadingVisibility,
         loadingColor: 'grey'
      })

      authService
         .signIn(form)
         .then((response) => {
            // persistenceLogin(response.data)
            // navigate('/timeline')
         })
         .catch((error) => {
            alert(error)
            setStates({
               ...states,
               disabledInput: false,
               loadingVisibility: false,
               loadingColor: 'white'
            })
         })
   }

   function handleChangeForm(e) {
      setForm({ ...form, [e.target.type]: e.target.value })
   }

   return (
      <Container>
         <BannerSign />

         <Form onSubmit={handleSignIn}>
            <Input
               type="email"
               placeholder="e-mail"
               disabled={states.disabledInput}
               value={form.email}
               onChange={handleChangeForm}
            />
            <Input
               type="password"
               placeholder="password"
               disabled={states.disabledInput}
               value={form.password}
               onChange={handleChangeForm}
            />
            <InputButton type="submit" disabled={states.disabledInput}>
               {loading} Log In
            </InputButton>

            <Link onClick={() => navigate('/sign-up')}>First time? Create an account!</Link>
         </Form>
      </Container>
   )
}
