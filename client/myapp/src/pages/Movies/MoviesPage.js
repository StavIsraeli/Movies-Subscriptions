import { Outlet, useNavigate } from 'react-router-dom';


const MoviesPage = () => {

  const navigate = useNavigate() 

  return (

    <div style={{ border: '3px solid black' }}>
      <h3>Movies Page</h3>
      <button onClick={()=> navigate('AllMovies')}>All Movies</button>
        <button onClick={()=> navigate('AddMovie')}>AddMovie</button>
     <br/><br/>   
    <Outlet/>
     <br/>
    </div>
  );
};

export default MoviesPage;