import { useState } from 'react';
import { addItem } from '../../utils';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {

  const [movie, setMovie] = useState();
  const navigate = useNavigate() 

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

  const addMovie= async (e) =>{
    
    const url= "http://localhost:8000/api/movie"
    const status = await addItem(url,movie);
    alert(status.data)
    navigate('../AllMovies')

  }



    return (
      <div style={{  }}>
        <h4>Add Movie Page</h4>
        Name:{' '}
        <input type='text' name='name' onChange={handleChange} /> <br />
        Premiered:{' '}
        <input type='text' value={movie?.premiered} required name='premiered' onChange={handleChange} /> <br />
        Genres:{' '}
        <input type='text' value={movie?.genres} required name='genres' onChange={handleChange} /> <br />
        Image url:{' '}
        <input type='text' value={movie?.image} required name='image' onChange={handleChange} /> <br />
        <button onClick={addMovie} >Save</button>
        <button onClick={()=> navigate('../AllMovies')}>Cancel</button>
      
  
       
      </div>
    );
  };
  
  export default AddMovie;