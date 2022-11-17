import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    
    const { name } = useParams();
    const navigate = useNavigate() 
    

  return (
    <div style={{textAlign: 'center'}}>
      <p>Hello <strong>{name}</strong> </p>
        <button onClick={()=> navigate('Movies/AllMovies')}>Movies</button>
        <button onClick={()=> navigate('Subscription/AllMembersPage')}>Subscriptions</button>
        <button onClick={()=> navigate('/')}>Log Out</button>
        <br/><br/>

        <Outlet/>
    </div>
  );
};

export default MainPage;