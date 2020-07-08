import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signUp } from "../../actions/AccountActions";

const SignUp = (props) => {
  const { signUp, account } = props;

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    signUp(data);
  };

  if (account) {
    return <Redirect to="/sign-in" />;
  }

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
  return { account: state.account.account };
};

export default connect(mapStateToProps, { signUp })(SignUp);
