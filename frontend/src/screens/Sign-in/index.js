import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signIn } from "../../actions/AccountActions";
import { getFormData, customValidation } from "../../helpers/form";

const SignIn = (props) => {
  const { signIn, account, messageError } = props;
  const [error, setError] = useState(false);

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

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = getFormData(e);

    await signIn(data);

    setError(false);
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
  return {
    account: state.account.account,
    messageError: state.account.messageError,
  };
};

export default connect(mapStateToProps, { signIn })(SignIn);
