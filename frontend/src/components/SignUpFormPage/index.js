import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

import './SignUpForm.css'

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    let error = []
    if (!email.includes('@')) error.push('Please Provide a valid email')
    if (password === confirmPassword) error.push('Confirm Password field must be the same as the Password field');
    if (!error[0]) {
        return dispatch(sessionActions.signup({ email, firstName, lastName, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    setErrors(error)
  };

  return (
    <form onSubmit={handleSubmit} className='happcloud' >
      <div className="topimg homie"></div>
      <span className="hometext signupheader">Please Enter Your info below</span>
      <div className="cloudallign">
        <img className='signuplogo' src="https://us.123rf.com/450wm/yupiramos/yupiramos1705/yupiramos170517378/78078187-kawaii-wolkenikone-%C3%BCber-wei%C3%9Fem-hintergrund-buntes-design-vektor-illustration.jpg?ver=6" />
      </div>
      <div className="cloudallign">
        <span className="cloudtext">Welcome! Good to have ya!</span>
      </div>
      <ul className='ul-allign'>
        {errors.map((error, idx) => <li key={idx} className='li-boyz'>{error}</li>)}
      </ul>
      <div className='editformdiv' id="signerup">
      <label>
        <input
          className='thefield'
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          className='thefield'
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          className='thefield'
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          className='thefield'
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          className='thefield'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        <input
          className='thefield'
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className='submitnew'>Sign Up</button>

      </div>

    </form>
  );
}

export default SignupFormPage;
