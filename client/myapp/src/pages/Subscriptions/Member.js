import {useEffect} from 'react'
import { useState } from 'react';
import { getAll, deleteItem, addItem } from '../../utils';
import { useNavigate, Link } from 'react-router-dom';

const Member = ({memberData}) => {
    const [member, setMember] = useState();
    const [subs, setSubs] = useState([]);
    const [show, setShow] = useState(false);
    const [movies, setMovies] = useState([]);
    const [newSub, setnewSub] = useState({memberId : memberData._id});

    const navigate = useNavigate()

    useEffect(() => {
      async function fetchMoviesData() {
        const url = "http://localhost:8000/api/movie";
        const resp = await getAll(url);
  
        setMovies(resp.data);
      }
        fetchMoviesData();
      },[]);
    
    useEffect(() => {
      
        setMember(memberData);

        async function fetchSubsData() {
          const url = "http://localhost:8000/api/subscription?memberId="+ memberData._id;
          const resp = await getAll(url);

          setSubs(resp.data);
        }
    
        fetchSubsData();
      });
      
      const subsList = subs.map((sub) => {
        return <li  key={sub._id}>
                  <Link to={'../../Movies/AllMovies/' + sub.movieId}>{sub.movieName}</Link> , {sub.date} 
              </li>;
      });

      const moviesList = movies.map((movie) => {
        const isWatched= subs.find((sub)=> sub.movieId==movie._id)
        if(!isWatched)
        return <option value={movie._id} key={movie._id}>
                  {movie.name}
              </option>;
      });

      const deleteMember= async ()=>
      {
        const url= "http://localhost:8000/api/member"
        const status = await deleteItem(url, member._id);
        alert(status.data)
        navigate('../AllMembersPage')

      }

      const subscribe = async()=>
      {
        const url= "http://localhost:8000/api/subscription"
        const status = await addItem(url, newSub);
        alert(status.data)

      }

      const handleChange = (e) => {
          const { name, value } = e.target;
          setnewSub({ ...newSub, [name]: value });
      };

      
    return (
      
      

        
      <div style={{border: '3px solid black' }}>
          <strong>Name :</strong> {member?.name}<br/>
          <strong>Email :</strong> {member?.email}<br/>
          <strong>City :</strong> {member?.city}
          <br/><br/>
          
          <div style={{border: '3px solid black', width:'500px', margin: 'auto', width: '50%' }}>
            <h3>Movies watched</h3>
            <button onClick={() => setShow((s) => !s)}>Subscribe to new movie</button><br/>
            <div style={{border: '3px solid red', display: show ? "block" : "none" , margin: 'auto', width: '50%'  }}>
              <strong>Add a new movie</strong><br/><br/>
              <select name='movieId' onChange={handleChange}>
                <option></option>
                {moviesList}
              </select>
              <input name='date' type="date" onChange={handleChange} /><br/>
              <button onClick={subscribe}>Subscribe</button>
              <br/>
            </div>
            <br/>
            <ul>
              {subsList}
            </ul>
          </div>
          
          
          
          
          <br/><br/>
          <button onClick={()=> navigate('../EditMember/'+member._id)} >Edit</button>
          <button onClick={deleteMember}>Delete</button>

          <br/><br/>
       
      </div>
    );
  };
  
  

export default Member;