import postService from '../../services/posts.service'
import userService from '../../services/user.service'

import { AuthContext } from '../../contexts/auth.context'
import { useContext, useEffect } from 'react'

export default function Home() {
   const { logout } = useContext(AuthContext)

   useEffect(() => {

   }, [])
   return (
      <>
         <h1>Home</h1>
         <h1
            onClick={() => logout()}
         >
            Sair
         </h1>
      </>
   )
}
