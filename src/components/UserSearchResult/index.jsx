import { useNavigate } from 'react-router-dom'
import { Container } from './index.style'
import useFetchTimeline from "../../hooks/useFetchTimeline";

export default function UserSearchResult({ id, image, username, states, setStates, isFollowing }) {
   
   const { fetchTimeline } = useFetchTimeline();
   const navigate = useNavigate()

   return (
      <Container
         data-test="user-search"
         onClick={() => {
            setStates({ ...states, result: [], searchInput: null, searchString: '' })
            fetchTimeline();
            navigate(`/user/${id}`)
         }}
      >
         <img src={image} alt="" />
         <span>
            {username} {isFollowing && <span>• following</span>}
         </span>
      </Container>
   )
}


