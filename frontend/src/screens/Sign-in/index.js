import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../../actions/AccountActions";
import { getFormData, customValidation } from "../../helpers/form";

const SignIn = (props) => {
  const { signIn, account } = props;

  if (account) {
    return <Redirect to="/manage/portal" />;
  }

  const fields = document.querySelectorAll("[required]");

  for (let field of fields) {
    field.addEventListener("invalid", (event) => {
      event.preventDefault();
      customValidation(event);
    });

    field.addEventListener("blur", customValidation);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const data = getFormData(e);

    signIn(data);

    if (!account) {
      const span = document.querySelector("span.returnError");

      span.innerHTML = "Invalid account.";

      setTimeout(() => {
        span.innerHTML = "";
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Sign In</h1>
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

          <div>
            <button className="submit">Login</button>
            <span className="returnError"></span>
          </div>
        </form>

        <div className="sign-up">
          <div>Don't have an account?</div>
          <Link to="/sign-up">Create account</Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { account: state.account.account };
};

export default connect(mapStateToProps, { signIn })(SignIn);
