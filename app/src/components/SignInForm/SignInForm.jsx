import React from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


function SignInForm({toggle}) {

    const navigate = useNavigate();
    const [email, setEmail] = React.useState('')
    const [password, setPaswword] = React.useState('')
    const [error, setError] = React.useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        try {
            const response = await axios.post('http://localhost:3000/auth/signin', {
                email,
                password,
            });
            const { token } = response.data;
            const decodedToken = jwtDecode(token); 
            document.cookie = `email=${decodedToken.email}; path=/`;
            document.cookie = `name=${decodedToken.name}; path=/`;
            document.cookie = `exp=${decodedToken.exp}; path=/`;
            navigate('/')
        } catch (error) {
            setError(true)
            console.error('Authentication error:', error);
        }
    }

  return (
      <div className="form-container sign-in-container">
          <form>
              <h1>Sign in</h1>
              <span>or use your account</span>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPaswword(e.target.value)}/>
              <div className='flex'>
              <button onClick={onSubmit}>Sign In</button>
              </div>
              <span className='error'>{error ? 'Invalid Cred' : ''}</span>
              <span className='second-button' onClick={toggle}>Sign Up</span>
          </form>
      </div>
  );
}


export default SignInForm;