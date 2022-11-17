import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getById , updateItem } from '../../utils';
import { useNavigate } from 'react-router-dom';

const EditMovie = () => {
  const [movie, setMovie] = useState();
  const { id } = useParams();
  const navigate = useNavigate() 

  useEffect(() => {
        
    async function fetchMovieData() {
        const url= "http://localhost:8000/api/movie"
        const resp = await getById(url, id);
        setMovie(resp.data);
    }

    fetchMovieData();
  },[]);

  const handleChange = (e) => {
    
    if(e.target.name=="genres")
    {
      let newGenres = e.target.value.split(",");
      setMovie({...movie, "genres" : newGenres})
    }
    else
    {
      const { name, value } = e.target;
      setMovie({ ...movie, [name]: value });

    }
    
  };

  const updateMovie= async (e) =>{
    
    const url= "http://localhost:8000/api/movie"
    const status = await updateItem(url, id, movie);
    alert(status.data)
    navigate('../AllMovies')

  }


    return (
      <div style={{  }}>
        <h4>Edit Movie Page</h4>
      
      Name:{' '}
        <input type='text' value={movie?.name}  name='name' onChange={handleChange} /> <br />
        Premiered:{' '}
        <input type='text' value={movie?.premiered}  name='premiered' onChange={handleChange} /> <br />
        Genres:{' '}
        <input type='text' value={movie?.genres}  name='genres' onChange={handleChange} /> <br />
        Image url:{' '}
        <input type='text' value={movie?.image} name='image' onChange={handleChange} /> <br />
        <button onClick={updateMovie} >Update</button>
        <button onClick={()=> navigate('../AllMovies')}>Cancel</button>
      
        
      
  
       
      </div>
    );
  };
  
  export default EditMovie;