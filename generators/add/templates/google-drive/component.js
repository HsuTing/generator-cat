'use strict';

import React from 'react';
import radium from 'radium';

const CLIENT_ID = '<%= client_id %>';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';

@radium
export default class GoogleDrive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    };

    this.handleClientLoad = this.handleClientLoad.bind(this);
    this.initClient = this.initClient.bind(this);
    this.updateSigninStatus = this.updateSigninStatus.bind(this);
    this.authClick = this.authClick.bind(this);
    this.signoutClick = this.signoutClick.bind(this);

    this.handleClientLoad();
  }

  render() {
    const {isSignedIn} = this.state;

    return (
      <button onClick={isSignedIn ? this.signoutClick : this.authClick}
              {...this.props}
      >{isSignedIn ? 'Sign Out' : 'Authorize'}</button>
    );
  }

  handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  updateSigninStatus(isSignedIn) {
    this.setState({isSignedIn});
  }

  authClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  signoutClick() {
    gapi.auth2.getAuthInstance().signOut();
  }
}
