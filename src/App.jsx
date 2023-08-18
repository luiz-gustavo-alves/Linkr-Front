import { Routes, Route, useLocation, Navigate } from 'react-router-dom'

import Header from './components/Header'

import { Login, Register, Home, HashtagPage, SearchPosts, UserPage } from './pages'

import { AuthProvider } from './contexts/auth.context'
import { FormsProvider } from './contexts/forms.context'

import './assets/styles/reset.css'
import './assets/styles/style.css'

export default function App() {
   const { pathname } = useLocation()

   function showHeader(pathname) {
      if (pathname === '/' || pathname === '/sign-up') {
         return false
      }

      return true
   }

   return (
      <>
         <AuthProvider>
            <FormsProvider>
               {showHeader(pathname) && <Header />}
               <Routes>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/sign-up" element={<Register />}></Route>
                  <Route path="/timeline" element={<Home />}></Route>
                  <Route path="/hashtag/:hashtag" element={<HashtagPage />}></Route>
                  <Route path="/user/:id" element={<UserPage />}></Route>
                  <Route path="/timeline/search/" element={<SearchPosts />}></Route>
                  <Route path="*" element={<Navigate to="/timeline" />}></Route>
               </Routes>
            </FormsProvider>
         </AuthProvider>
      </>
   )
}
