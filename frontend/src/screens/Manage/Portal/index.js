import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { signOut, usersList } from "../../../actions/AccountActions";

const Portal = ({ signOut, account, users, usersList }) => {
  useEffect(() => {
    if (account) usersList();
  }, [usersList, account]);

  if (!account) {
    return <Redirect to="/sign-in" />;
  }

  const signOutHandler = (e) => {
    e.preventDefault();

    signOut();
  };

  return (
    <>
      <div>
        <h1>Portal</h1>
        <button onClick={signOutHandler}>Logout</button>
      </div>
      <div>
        <span>{`Hello, ${account.email}`}</span>
        <br />
        <h4>Users list</h4>

        {users && users.length
          ? users.map((user) => {
              return (
                <div key={user._id}>
                  <span>{user.email}</span>
                </div>
              );
            })
          : null}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    users: state.account.users,
  };
};

export default connect(mapStateToProps, { signOut, usersList })(Portal);
