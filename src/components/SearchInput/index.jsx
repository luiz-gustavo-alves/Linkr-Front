import { DebounceInput } from 'react-debounce-input'
import { useContext, useEffect, useRef, useState } from 'react'
import UserSearchResult from '../UserSearchResult'
import { Container } from './style'
import userService from '../../services/user.service'
import { AuthContext } from '../../contexts/auth.context'

export default function SearchInput() {
   const { auth } = useContext(AuthContext)
   const [currentUserID, setCurrentUserID] = useState(false)

   const [states, setStates] = useState({
      users: [],
      searchString: '',
      searchInput: null,
      result: [],
      inputRef: useRef(null),
      containerRef: useRef(null)
   })

   useEffect(() => {
      const [headerBase64, payloadBase64, signature] = auth.authToken.split('.')
      const payload = JSON.parse(atob(payloadBase64))

      setCurrentUserID(payload.id)
   }, [])

   const handleChangeSearch = (e) => {
      setStates({ ...states, searchInput: e.target.value })

      if (e.target.value === '') {
         setStates({ ...states, result: [], searchInput: null })
      }
   }

   const handleOpenCurrentSearch = (e) => {
      if (e.target.value !== '') {
         setStates({ ...states, searchInput: e.target.value })
      }
   }

   useEffect(() => {
      states.searchInput &&
         userService
            .getUsersBySearch({query: states.searchInput, userID: currentUserID})
            .then((response) => {
               console.log(response.data)
               setStates({
                  ...states,
                  result: response.data.filter((user) => {
                     const input = states.searchInput.toLowerCase()
                     const username = user.name.toLowerCase()
                     
                     return username.startsWith(input)
                  })
               })
            })
            .catch((error) => console.log(error))
   }, [states.searchInput])

   useEffect(() => {
      setStates({ ...states, result: [], searchInput: null })
      const handleClickOutside = (event) => {
         if (
            states.containerRef.current &&
            !states.containerRef.current.contains(event.target) &&
            states.inputRef.current !== event.target
         ) {
            setStates({ ...states, result: [], searchInput: null })
         }
      }

      document.addEventListener('click', handleClickOutside)
      return () => {
         document.removeEventListener('click', handleClickOutside)
      }
   }, [])

   return (
      <Container result={states.searchInput} ref={states.containerRef}>
         <DebounceInput
            className="searchInput"
            placeholder="Search for people"
            data-test="search"
            minLength={3}
            debounceTimeout={300}
            value={states.searchInput ?? ''}
            onChange={handleChangeSearch}
            onFocus={handleOpenCurrentSearch}
            ref={states.inputRef}
         />

         <div className="searchResult">
            {states.result.length === 0 && states.searchInput !== null ? (
               <p>No results found. Try again.</p>
            ) : (
               states.result.map((user) => {
                  return (
                     <UserSearchResult
                        key={user.id}
                        id={user.id}
                        image={user.imageURL}
                        username={user.name}
                        states={states}
                        setStates={setStates}
                        isFollowing={user.isFollower}
                     />
                  )
               })
            )}
         </div>
      </Container>
   )
}
