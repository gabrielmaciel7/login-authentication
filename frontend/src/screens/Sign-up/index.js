import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signUp } from "../../actions/AccountActions";
import { getFormData } from "../../helpers/form";

const SignUp = (props) => {
  const { signUp, account } = props;

  const submitHandler = (e) => {
    e.preventDefault();

    const data = getFormData(e);

    signUp(data);
  };

  if (account) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Sign Up</h1>
        <form onSubmit={submitHandler}>
          <div className="input">
            <input type="email" name="email" required />
            <label>E-mail</label>
            <span className="error"></span>
          </div>

          <div className="input">
            <input type="password" name="password" required />
            <label>Password</label>
            <span className="error"></span>
          </div>

          <div className="input">
            <input type="password" name="password_confirmation" required />
            <label>Password confirmation</label>
            <span className="error"></span>
          </div>

          <div>
            <button className="submit">Create account</button>
            <span className="returnError"></span>
          </div>
        </form>
        <div className="sign-up">
          <div>Already have an account?</div>
          <Link to="/sign-in">Login</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { account: state.account.account };
};

export default connect(mapStateToProps, { signUp })(SignUp);
