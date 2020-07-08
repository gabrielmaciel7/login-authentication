import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signOut } from "../../../actions/AccountActions";

const Portal = ({ signOut, account }) => {
  if (!account) {
    return <Redirect to="/sign-in" />;
  }

  const signOutHandler = (e) => {
    e.preventDefault();

    signOut();
  };

  return (
    <div>
      <h1>Portal</h1>
      <button onClick={signOutHandler}>Logout</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { account: state.account.account };
};

export default connect(mapStateToProps, { signOut })(Portal);
