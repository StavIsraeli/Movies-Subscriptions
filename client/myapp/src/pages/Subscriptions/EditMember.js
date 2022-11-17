import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getById , updateItem } from '../../utils';
import { useNavigate } from 'react-router-dom';

const EditMember = () => {
  const [member, setMember] = useState();
  const { id } = useParams();
  const navigate = useNavigate() 

  useEffect(() => {
        
    async function fetchMovieData() {
        const url= "http://localhost:8000/api/member"
        const resp = await getById(url, id);
        setMember(resp.data);
    }

    fetchMovieData();
  },[]);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const updateMember= async (e) =>{
    
    const url= "http://localhost:8000/api/member"
    const status = await updateItem(url, id, member);
    alert(status.data)
    navigate('../AllMembersPage')

  }


    return (
      <div style={{  }}>
        <h4>Edit Movie Page</h4>
      
      Name:{' '}
        <input type='text' value={member?.name}  name='name' onChange={handleChange} /> <br />
        City:{' '}
        <input type='text' value={member?.city}  name='city' onChange={handleChange} /> <br />
        Email:{' '}
        <input type='text' value={member?.email}  name='email' onChange={handleChange} /> <br />
       
        
        <button onClick={updateMember} >Update</button>
        <button onClick={()=> navigate('../AllMembersPage')}>Cancel</button>
      
        
      
  
       
      </div>
    );
  };
  
  export default EditMember;