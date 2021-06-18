import React, { useState } from "react";
import axiosWithAuth from '../helpers/axiosWithAuth';
import { useHistory } from 'react-router-dom';

const initialState = {
  username: '',
  password: ''
}

const Login = () => {
  const [credentials, setCredentials] = useState(initialState);
  const { push } = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [error, setError] = useState("");
  //replace with error state

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const submit = e => {
    e.preventDefault()
    if(credentials.username || credentials.password === ''){
      setError("Username and Password are required!")
    }
    axiosWithAuth().post("/login", credentials)
      .then( res => {
        localStorage.setItem("token", res.data.payload)
        push('/bubbles')
      })
      .catch( err => {
        setError("Username or Password is incorrect. Please see readme.")
      })

  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={submit}>
          <input
            data-testid="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            data-testid="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>

      { 
        error &&
        <p data-testid="errorMessage" className="error">{error}</p>
      }
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda / i<3Lambd4, save that token to localStorage.