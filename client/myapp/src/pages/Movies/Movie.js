import {useEffect} from 'react'
import { useState } from 'react';
import { getById, getAll, deleteItem } from '../../utils';
import { useNavigate, Link } from 'react-router-dom';

const Movie = ({movieId}) => {
    const [movie, setMovie] = useState();
    const [subs, setSubs] = useState([]);
    const navigate = useNavigate() 
    useEffect(() => {
        
        async function fetchMovieData() {
            const url= "http://localhost:8000/api/movie"
            const resp = await getById(url, movieId);
            setMovie(resp.data);
        }

        async function fetchSubsData() {
          const url = "http://localhost:8000/api/subscription?movieId="+ movieId;
          const resp = await getAll(url);

          setSubs(resp.data);
        }
    
        fetchMovieData();
        fetchSubsData();
      },[movieId]);
      
      const subsList = subs.map((sub) => {
        return <li  key={sub._id}>
                  <Link to={'../../Subscription/EditMember/' + sub.memberId}>{sub.memberName}</Link> , {sub.date} 
              </li>;
      });

      const deleteMovie= async ()=>
      {
        const url= "http://localhost:8000/api/movie"
        const status = await deleteItem(url, movie._id);
        alert(status.data)
        navigate('../AllMovies/')

      }

    return (

        
      <div style={{border: '3px solid black'}}>
          <strong>Name :</strong> {movie?.name}<br/>
          <strong>Premiered :</strong> {movie?.premiered}<br/>
          <strong>Genres :</strong> {movie?.genres.join(', ')}
          <br/><br/>
          
          <div style={{border: '3px solid black', margin: 'auto', width: '50%' }}>
            <h3>Subscriptions watched</h3>
            <ul>
              {subsList}
            </ul>
          </div>
          <img src={movie?.image}/>
          
          
          
          
          <br/><br/>
          <button onClick={()=> navigate('../EditMovie/'+movie._id)} >Edit</button>
          <button onClick={deleteMovie}>Delete</button>

          <br/><br/>
       
      </div>
    );
  };
  
  

export default Movie;