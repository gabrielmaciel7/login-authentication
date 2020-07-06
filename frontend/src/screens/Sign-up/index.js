import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="container">
      <h1>Sign Up</h1>
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
          <div className="form-group">
            <label>Password confirmation</label>
            <input type="password" />
          </div>
          <div>
            <button className="submit">Submit</button>
          </div>
        </form>
        <div>
          <div>Already have an account?</div>
          <Link to='/sign-in'>Sign-in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;