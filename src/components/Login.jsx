import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import noteContext from '../Context/notes/noteContext';

const Login = (props) => {
  const constaxt = useContext(noteContext);
  const { fetchNotes, host } = constaxt;

  let navigate = useNavigate();


  useEffect(() => {
    props.changeTitle(props.title);
    // eslint-disable-next-line
  }, []);

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/login`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": loginInfo.email,
        "password": loginInfo.password
      })
    }).then((response) => { return response.json() })
      .then((result) => {
        console.log(result);
        if (result.authToken !== undefined) {
          localStorage.setItem('token', result.authToken);
          // If successfully loged in Redirect to Home
          props.showAlert("Loged in Successfully", "success");
          fetchNotes();
          navigate('/');
        }
        else {
          result.history = undefined;
          props.showAlert("Invalid Credintials", "danger");
        }
      });
  }
  return (
    <div className="row justify-content-center py-5">
      <div className="col" style={{ maxWidth: '350px' }}>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} >
              <h3 className="mb-3">Login</h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" name='email' className="form-control" value={loginInfo.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name='password' value={loginInfo.password} onChange={onChange} className="form-control" id="password" />
              </div>
              <div className="form-label">Don't have Account <Link to="/signup">Sign Up</Link></div>
              <button type="submit" disabled={(!/^[a-zA-Z]([a-zA-Z0-9\_\-\.])+@([a-zA-Z0-9])([a-zA-Z0-9\_\-\.])+\.([a-zA-Z]){2,7}$/.test(loginInfo.email)) || (!/^[\S+]{3,}$/g.test(loginInfo.password))} className="btn btn-primary">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login