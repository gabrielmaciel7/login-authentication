import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signUp } from "./SignUpActions";

const SignUp = (props) => {
  const { signUp } = props;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    signUp(data);
  };
  return (
    <div className="container">
      <h1>Sign Up</h1>
      <div className="">
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label>E-mail</label>
            <input type="text" name="email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" />
          </div>
          <div className="form-group">
            <label>Password confirmation</label>
            <input type="password" name="password_confirmation" />
          </div>
          <div>
            <button className="submit">Submit</button>
          </div>
        </form>
        <div>
          <div>Already have an account?</div>
          <Link to="/sign-in">Sign-in</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { account: state.signUp.account };
};

export default connect(mapStateToProps, { signUp })(SignUp);
