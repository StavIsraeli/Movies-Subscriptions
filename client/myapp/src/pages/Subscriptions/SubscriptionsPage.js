import { Outlet, useNavigate } from 'react-router-dom';


const SubscriptionsPage = () => {

  const navigate = useNavigate() 

  return (

    <div style={{ border: '3px solid black' }}>
      <h3>Subscriptions</h3>
      <button onClick={()=> navigate('AllMembersPage')}>All Members</button>
        <button onClick={()=> navigate('AddMember')}>Add Member</button>
     <br/><br/>   
    <Outlet/>
     <br/>
    </div>
  );
};

export default SubscriptionsPage;