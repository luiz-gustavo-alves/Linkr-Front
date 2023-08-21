import { css, styled } from 'styled-components'
import { DebounceInput } from 'react-debounce-input'
import { useEffect, useRef, useState } from 'react'
import UserSearchResult from '../UserSearchResult'

export default function SearchInput() {
   const [searchInput, setSearchInput] = useState(null)
   const [result, setResult] = useState([])
   const inputRef = useRef(null)
   const containerRef = useRef(null)

   const users = [
      {
         idUser: '1',
         name: 'Geraldo',
         imageURL:
            'https://static.vecteezy.com/ti/vetor-gratis/p3/3715527-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-vetor.jpg'
      },
      {
         idUser: '2',
         name: 'Gerlandio',
         imageURL:
            'https://static.vecteezy.com/ti/vetor-gratis/p3/3715527-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-vetor.jpg'
      },
      {
         idUser: '3',
         name: 'Luiz',
         imageURL:
            'https://static.vecteezy.com/ti/vetor-gratis/p3/3715527-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-vetor.jpg'
      },
      {
         idUser: '4',
         name: 'Lucas',
         imageURL:
            'https://static.vecteezy.com/ti/vetor-gratis/p3/3715527-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-vetor.jpg'
      },
      {
         idUser: '5',
         name: 'Eduardo',
         imageURL:
            'https://static.vecteezy.com/ti/vetor-gratis/p3/3715527-imagem-perfil-icone-masculino-icone-humano-ou-pessoa-sinal-e-simbolo-vetor.jpg'
      }
   ]

   const handleSearchUser = (e) => {
      setSearchInput(e.target.value)

      if (e.target.value === '') {
         setResult([])
      }
   }

   const handleOpenCurrentSearch = (e) => {
      if (e.target.value !== '') {
         setSearchInput(e.target.value)
      }
   }

   useEffect(() => {
      searchInput &&
         setResult(
            users.filter((user) => {
               const input = searchInput.toLowerCase()
               const username = user.name.toLowerCase()

               return username.startsWith(input)
            })
         )
   }, [searchInput])

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (
            containerRef.current &&
            !containerRef.current.contains(event.target) &&
            inputRef.current !== event.target
         ) {
            setResult([])
            setSearchInput(null)
         }
      }

      document.addEventListener('click', handleClickOutside)
      return () => {
         document.removeEventListener('click', handleClickOutside)
      }
   }, [])

   return (
      <Container result={searchInput} ref={containerRef}>
         <DebounceInput
            className="searchInput"
            placeholder="Search for people"
            minLength={3}
            debounceTimeout={300}
            onChange={handleSearchUser}
            onFocus={handleOpenCurrentSearch}
            ref={inputRef}
         />

         <div className="searchResult">
            {result &&
               result.map((user) => {
                  return (
                     <UserSearchResult
                        key={user.idUser}
                        id={user.idUser}
                        image={user.imageURL}
                        username={user.name}
                     />
                  )
               })}
         </div>
      </Container>
   )
}

const Container = styled.div`
   ${({ result }) => {
      return (
         result &&
         css`
            min-height: 176px;
            height: 176px;
            background: #e7e7e7;
         `
      )
   }}

   width: 563px;
   min-height: 45px;
   border-radius: 8px;
   padding-bottom: 23px;
   position: relative;
   z-index: 100;
   display: flex;
   flex-direction: column;

   .searchInput {
      width: 563px;
      height: 45px;
      border: none;
      outline: none;
      border-radius: 8px;
      background: #fff;
      padding: 10px 17px;
      font-size: 19px;
      position: inherit;

      z-index: 10;
      &::placeholder {
         color: #c6c6c6;
      }
   }

   .searchResult {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding-inline: 17px;
      padding-top: 14px;
   }
`
