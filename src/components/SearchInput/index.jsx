import { DebounceInput } from 'react-debounce-input'
import { useEffect, useRef, useState } from 'react'
import UserSearchResult from '../UserSearchResult'
import { Container } from './style'
import userService from '../../services/user.service'

export default function SearchInput() {
   const [states, setStates] = useState({
      users: [],
      searchString: '',
      searchInput: null,
      result: [],
      inputRef: useRef(null),
      containerRef: useRef(null)
   })

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
            .getUsersBySearch(states.searchInput)
            .then((response) => {
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
                        data-test="user-search"
                        key={user.id}
                        id={user.id}
                        image={user.imageURL}
                        username={user.name}
                        states={states}
                        setStates={setStates}
                     />
                  )
               })
            )}
         </div>
      </Container>
   )
}
