import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Form, Input, InputButton, Link } from '../../assets/styles/Form.style'
import BannerSign from '../../components/BannerSign/BannerSign'
import authService from '../../services/auth.service'
import { FormsContext } from '../../contexts/forms.context'

// import authService from '../../services/auth.service'

export default function Register() {
   const navigate = useNavigate()
   const { states, setStates, loading } = useContext(FormsContext)

   useEffect(() => {
      setStates({
         ...states,
         disabledInput: false,
         loadingVisibility: false,
         loadingColor: 'white'
      })
   }, [])

   const [form, setForm] = useState({
      name: '',
      email: '',
      imageURL: '',
      password: ''
   })

   const handleSignUp = (e) => {
      e.preventDefault()

      setStates({
         disabledInput: !states.disabledInput,
         loadingVisibility: !states.loadingVisibility,
         loadingColor: 'grey'
      })

      authService
         .signUp(form)
         .then((response) => {
            navigate('/')
         })
         .catch((error) => {
            alert(error.response.data)
            setStates({
               ...states,
               disabledInput: false,
               loadingVisibility: false,
               loadingColor: 'white'
            })
         })
   }

   function handleChangeForm(e) {
      setForm({ ...form, [e.target.name]: e.target.value })
   }

   return (
      <Container>
         <BannerSign />

         <Form onSubmit={handleSignUp}>
            <Input
               type="text"
               placeholder="e-mail"
               data-test="email"
               name="email"
               disabled={states.disabledInput}
               autoComplete="new-password"
               value={form.email}
               onChange={handleChangeForm}
            />
            <Input
               type="password"
               placeholder="password"
               data-test="password"
               name="password"
               disabled={states.disabledInput}
               value={form.password}
               onChange={handleChangeForm}
            />
            <Input
               type="text"
               placeholder="username"
               data-test="username"
               name="name" 
               disabled={states.disabledInput}
               value={form.name}
               onChange={handleChangeForm}
            />

            <Input
               type="text"
               placeholder="picture url"
               data-test="picture-url" 
               name="imageURL"
               disabled={states.disabledInput}
               value={form.imageURL}
               onChange={handleChangeForm}
            />

            <InputButton type="submit" data-test="sign-up-btn" disabled={states.disabledInput}>
               {loading} Sign Up
            </InputButton>

            <Link data-test="login-link" onClick={() => navigate('/')}>Switch back to log in</Link>
         </Form>
      </Container>
   )
}
