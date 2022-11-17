import { useState } from 'react'
import { authentication } from '../utils';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (username&&password) {
          const loginData = { username: username, password: password };
          //const { data } = await authentication(obj);
          const url = 'http://localhost:8000/api/user';
          const resp = await fetch(url, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData),
          });
          const data = await resp.json();
          if(data)
          {
            sessionStorage['accessToken'] = data.accessToken;
            navigate('/Main/'+ data.data.fullName + '/Movies/AllMovies')

          }
          else
          {
            alert("Username Or Password Are Incorrect!")
          }

          
        } 
        else {

          alert('username and password are mandatory!');
        }
      };

  return (
    <div style={{ backgroundColor: 'grey', width: '400px', height: '400px' }}>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        Username:{' '}
        <input type='text' onChange={(e) => setUsername(e.target.value)} /> <br />
        Password:{' '}
        <input type='text' onChange={(e) => setPassword(e.target.value)} /> <br />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;