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
    <div className="portalContainer">
      <header>
        <div className="menu">
          <h1>Portal</h1>
          <button onClick={signOutHandler}>Logout</button>
        </div>
      </header>
      <div className="portalContent">
        <div className="hello">
          <h4>{`Hello, ${account.email}`}</h4>
        </div>
        <div className="users-list">
          <h3>Users list</h3>

          <div className="list">
            {users && users.length
              ? users.map((user) => {
                  return (
                    <div key={user._id}>
                      <p>{user.email}</p>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    users: state.account.users,
  };
};

export default connect(mapStateToProps, { signOut, usersList })(Portal);
