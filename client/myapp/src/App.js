import { Routes, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage'
import MainPage from './pages/MainPage'
import MoviesPage from './pages/Movies/MoviesPage';
import AllMoviesPage from './pages/Movies/AllMoviesPage';
import AddMovie from './pages/Movies/AddMoviePage';
import EditMovie from './pages/Movies/EditMoviePage';
import AllMembersPage from './pages/Subscriptions/AllMembersPage';
import SubscriptionsPage from './pages/Subscriptions/SubscriptionsPage';
import EditMember from './pages/Subscriptions/EditMember';
import AddMember from './pages/Subscriptions/AddMember';

const App = () => {
  return (
    <div>
      <h1>Movies - Subscriptions Website</h1>
      

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/Main/:name' element={<MainPage />}>
          <Route path='Movies' element={<MoviesPage/>} >
            <Route path='EditMovie/:id' element={<EditMovie/>}/>
            <Route path='AllMovies' element={<AllMoviesPage/>}/>
            <Route path='AllMovies/:id' element={<AllMoviesPage/>}/>
            <Route path='AddMovie' element={<AddMovie/>}/>
          </Route>
          
          <Route path='Subscription' element={<SubscriptionsPage/>} >
            <Route path='AllMembersPage' element={<AllMembersPage/>}/>
            <Route path='AddMember' element={<AddMember/>}/>
            <Route path='EditMember/:id' element={<EditMember/>}/>
          </Route>
        </Route>
        
      </Routes>
    </div>
  );
};

export default App;
