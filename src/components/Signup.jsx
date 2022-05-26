import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = (props) => {
  const host = "http://localhost:5000";
  let navigate = useNavigate();

  useEffect(() => {
    props.changeTitle(props.title);
    // eslint-disable-next-line
  }, []);

  const [loginInfo, setLoginInfo] = useState({ name: "", email: "", password: "", cpassword: "" });
  const onChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.id]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${host}/api/auth/createuser`;
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": loginInfo.name,
        "email": loginInfo.email,
        "password": loginInfo.password
      })
    }).then((response) => { return response.json() })
      .then((result) => {
        console.log(result);
        if (result.authToken !== undefined) {
          props.showAlert("Signup Successfully Please Login to Continued.", "success");
          navigate('/login');
        }
        else {
          result.authToken = undefined;
          props.showAlert("Invalid Credintials", "danger");
        }
      });
  }
  return (
    <div className="row justify-content-center py-5">
      <div className="col" style={{ maxWidth: '350px' }}>
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h3 className="mb-3">Sign Up</h3>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="name" className="form-control" name='name' onChange={onChange} required minLength={3} id="name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" name='email' onChange={onChange} id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name='password' className="form-control" onChange={onChange} required minLength={5} id="password" />
              </div>
              <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" name='cpassword' className="form-control" onChange={onChange} required minLength={5} id="cpassword" />
              </div>
              <div className="form-label">Already have an Account <Link to='/login'>Login</Link></div>
              <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup