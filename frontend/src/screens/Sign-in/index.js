import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "./SignInActions";

const SignIn = (props) => {
  const { account, signIn } = props;

  const submitHandler = (e) => {
    e.preventDefault();

    signIn({ email: "gabrielmaciel.nave@gmail.com", password: "123" });
  };

  console.log(account);

  return (
    <div className="container">
      <h1>Sign In</h1>
      <div className="">
        <form onSubmit={submitHandler}>
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
          <Link to="/sign-up">Sign-up</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { account: state.signIn.account };
};

export default connect(mapStateToProps, { signIn })(SignIn);
