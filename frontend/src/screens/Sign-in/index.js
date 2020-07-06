import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div className="container">
      <h1>Sign In</h1>
      <div className="">
        <form>
          <div className="form-group">
            <label>E-mail</label>
            <input type="text" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" />
          </div>
          <div>
            <button className="submit">Submit</button>
          </div>
        </form>
        <div>
          <div>Don't have an account?</div>
          <Link to='/sign-up'>Sign-up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
