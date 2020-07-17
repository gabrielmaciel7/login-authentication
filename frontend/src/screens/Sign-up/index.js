import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signUp } from "../../actions/AccountActions";
import { getFormData, addEvents } from "../../helpers/form";

const SignUp = (props) => {
  const { signUp, account, messageError } = props;

  const [error, setError] = useState(false);
  const [redirectToPortal, setRedirectToPortal] = useState(false);

  useEffect(() => {
    if (messageError && !account && !error) {
      const span = document.querySelector("span.returnError");

      span.innerHTML = messageError;

      const timer = setTimeout(() => {
        span.innerHTML = "";
        setError(true);
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [messageError, account, error]);

  useEffect(() => addEvents(), []);

  if (account) {
    setTimeout(() => {
      setRedirectToPortal(true);
    }, 3000);
  }

  if (redirectToPortal) {
    return <Redirect to="/manage/portal" />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = getFormData(e);

    await signUp(data);

    setError(false);
  };

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

      {account && !redirectToPortal ? (
          <div className="successModal">
            <h1>Account Created!</h1>
          </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    messageError: state.account.messageError,
  };
};

export default connect(mapStateToProps, { signUp })(SignUp);
