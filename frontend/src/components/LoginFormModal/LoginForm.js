import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import signinboi from '../../SiteImages/signinboi.png'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUser = (e) => {
    e.preventDefault();
    setErrors([]);
    setCredential("Demo-lition")
    setPassword("password")
  }

  return (
    <div className="outerloginrim">
      <img className="mascot" src={signinboi} />

      <button className="demouser" onClick={demoUser}>Demo Account</button>

      <form onSubmit={handleSubmit} className='loginmad'>
      <h2>SIGN IN</h2>
      <ul className="loginmad">
        {errors.map((error, idx) => (
          <li key={idx} className='logerr'>{error}</li>
        ))}
      </ul>
      <label className="loginmad">
        <input
        className="loginmad"
          type="text"
          placeholder="Username or email..."
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label className="loginmad">
        <input
          className="loginmad"
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit" className="inbutton">Log In</button>
    </form>
    </div>

  );
}

export default LoginForm;
