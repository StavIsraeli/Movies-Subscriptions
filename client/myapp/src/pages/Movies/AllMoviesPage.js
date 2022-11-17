import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Movie from './Movie';
import { getAll, getById } from '../../utils';


const AllMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState('')
  const { id } = useParams();
    
  useEffect(() => {
    if(id)
    {
      async function fetchData1() {
        const url= "http://localhost:8000/api/movie"
          const resp = await getById(url, id);
          setFilteredMovies([resp.data])
          
        }
  
      fetchData1();
    }
    else if(searchMovie=="")
    {
      async function fetchData() {

        const accessToken = sessionStorage['accessToken'];
        const url= "http://localhost:8000/api/movie"
          //const resp = await getAll(url);
          //setMovies(resp.data)
          //setFilteredMovies(resp.data) 
          const resp = await fetch(url, {
            method: 'get',
            headers: { 'x-access-token': accessToken },
          });
          const movies = await resp.json();
          setMovies(movies)
          setFilteredMovies(movies) 
        }
  
      fetchData();
    }
    
  }, [id, movies]); 
  


  const hundleChange = (e)=>
  {
    if(e.target.value=="")
    {
      setFilteredMovies(movies)
    }

    setSearchMovie(e.target.value)
  }

  const Search = async () =>
  {
    
    const url= "http://localhost:8000/api/movie?name=" + searchMovie
        const resp = await getAll(url);
        setFilteredMovies(resp.data)

  }

  let movieList= filteredMovies.map((movie) => {
    return <div  key={movie._id}>

        <Movie movieId={movie._id} />
        <br/>
        </div>;
  })
  

    return (
      <div style={{  }}>
        <h4>All Movies Page</h4>
        <div>Find Movie : <input onChange={hundleChange} type="text"/><button onClick={Search}>Search</button></div>
        <br/><br/>
          {movieList}
       
      </div>
    );
  };
  
  export default AllMoviesPage;