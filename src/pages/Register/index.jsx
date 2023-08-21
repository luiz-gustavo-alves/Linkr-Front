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
            console.log(response.data)
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

   function handleChangeForm(str) {
      return (e) => {
         setForm({ ...form, [str]: e.target.value })
      }
   }

   return (
      <Container>
         <BannerSign />

         <Form onSubmit={handleSignUp}>
            <Input
               type="email"
               placeholder="e-mail"
               data-test="email"
               disabled={states.disabledInput}
               autoComplete="new-password"
               value={form.email}
               onChange={handleChangeForm('email')}
            />
            <Input
               type="password"
               placeholder="password"
               data-test="password"
               disabled={states.disabledInput}
               value={form.password}
               onChange={handleChangeForm('password')}
            />
            <Input
               type="text"
               placeholder="username"
               data-test="username" 
               disabled={states.disabledInput}
               value={form.name}
               onChange={handleChangeForm('name')}
            />

            <Input
               type="text"
               placeholder="picture url"
               data-test="picture-url" 
               disabled={states.disabledInput}
               value={form.imageURL}
               onChange={handleChangeForm('imageURL')}
            />

            <InputButton type="submit" data-test="sign-up-btn" disabled={states.disabledInput}>
               {loading} Sign Up
            </InputButton>

            <Link data-test="login-link" onClick={() => navigate('/')}>Switch back to log in</Link>
         </Form>
      </Container>
   )
}
