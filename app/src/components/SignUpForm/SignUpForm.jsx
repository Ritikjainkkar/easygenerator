import React from 'react'
import axios from 'axios'

function SignUpForm({toggle}) {
    
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPaswword] = React.useState('')
    const [error, setError] = React.useState('')
    
    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', {
                name,
                email,
                password,
            });
            toggle()
        } catch (err) {
            console.log()
            setError(err.response.data.message)
        }
    }

  return (
      <div className="form-container sign-in-container">
          <form>
              <h1>Create Account</h1>
              <span>or use your email for registration</span>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPaswword(e.target.value)}/>
              <button onClick={onSubmit}>Sign Up</button>
              <div style={{width: '100%', display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start'}}>
                <p style={{margin: '0px', marginTop: '12px'}}>• Minimum length of 8 characters</p>
                <p style={{margin: '0px'}}>• Contains at least 1 letter.</p>
                <p style={{margin: '0px'}}>• Contains at least 1 number.</p>
                <p style={{margin: '0px'}}>• Contains at least 1 special character.</p>
              </div>
              {error ? <span class="error">{error}</span> : <></>}
              <span className='second-button' onClick={toggle}>Sign In</span>
          </form>
      </div>
  );
}


export default SignUpForm;