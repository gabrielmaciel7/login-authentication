import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../../actions/AccountActions";
import { getFormData } from "../../helpers/form";

const SignIn = (props) => {
  const { signIn, account } = props;

  if (account) {
    return <Redirect to="/manage/portal" />;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const data = getFormData(e);

    signIn(data);
  };

  return (
    <div className="container">
      <h1>Sign In</h1>
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
  return { account: state.account.account };
};

export default connect(mapStateToProps, { signIn })(SignIn);
