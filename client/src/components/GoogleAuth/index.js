import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from 'store/actions/auth';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load(
      'client:auth2',
      () => window.gapi.client.init({
        clientId: '346179104772-7kc9a90bs640euhfkfjea3jq58c1rajf.apps.googleusercontent.com',
        scope: 'email',
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    );
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  signInHandler = () => {
    this.auth.signIn();
  }
  
  signOutHandler = () => {
    this.auth.signOut();
  }

  renderAuthButton() {
    const { isSignedIn } = this.props;

    if (isSignedIn === null) {
      return (
        <div>
          I don't know if we signed in
        </div>
      );
    } else if (isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={this.signOutHandler}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui red google button"
          onClick={this.signInHandler}
        >
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  render() {
    return this.renderAuthButton();
  }
}

const mapStateToProps = ({ auth }) => ({
  isSignedIn: auth.isSignedIn,
});

const mapDispatchToProps = {
  signIn,
  signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
