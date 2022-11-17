import { useState } from 'react';
import { addItem } from '../../utils';
import { useNavigate } from 'react-router-dom';

const AddMember = () => {

  const [member, setMember] = useState();
  const navigate = useNavigate() 

  const handleChange = (e) => {
    
      const { name, value } = e.target;
      setMember({ ...member, [name]: value });


    
  };

  const addMember= async (e) =>{
    
    const url= "http://localhost:8000/api/member"
    const status = await addItem(url,member);
    alert(status.data)
    navigate('../AllMembersPage')

  }



    return (
      <div style={{  }}>
        <h4>Add Member Page</h4>
        Name:{' '}
        <input type='text' onChange={handleChange} name='name' /> <br />
        Email:{' '}
        <input type='text' onChange={handleChange}   name='email'/> <br />
        City:{' '}
        <input type='text' onChange={handleChange}   name='city' /> <br />
        
        <button onClick={addMember} >Save</button>
        <button onClick={()=> navigate('../AllMembersPage')}>Cancel</button>
      
  
       
      </div>
    );
  };
  
  export default AddMember;