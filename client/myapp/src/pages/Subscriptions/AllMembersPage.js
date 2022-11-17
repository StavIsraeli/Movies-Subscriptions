import { useState, useEffect } from 'react';
import Member from './Member';
import { getAll } from '../../utils';


const AllMembersPage = () => {
  const [members, setMembers] = useState([]);

  
    
  useEffect(() => {
    
    async function fetchData() {
      const accessToken = sessionStorage['accessToken'];
      const url= "http://localhost:8000/api/member"
        //const resp = await getAll(url);
        const resp = await fetch(url, {
          method: 'get',
          headers: { 'x-access-token': accessToken },
        });
        const members = await resp.json();
        setMembers(members)
        
      }

    fetchData();
  }, [members]); 
  

  let memberList= members.map((member) => {
    return <div  key={member._id}>

        <Member memberData={member} />
        <br/>
        </div>;
  })
  

    return (
      <div style={{  }}>
        <h4>All Members Page</h4>
        <br/><br/>
          {memberList}
       
      </div>
    );
  };
  
  export default AllMembersPage;