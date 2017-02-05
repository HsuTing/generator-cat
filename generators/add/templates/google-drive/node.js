'use strict';

import fs from 'fs';
import path from 'path';
import process from 'process';
import readline from 'readline';
import googleAuth from 'google-auth-library';

import secret from './../../.ignore/google_drive_secret.json';

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
const TOKEN_PATH = path.resolve(__dirname, './../../.ignore/google_drive_token.json');

const getNewToken = (oauth2Client, callback) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  console.log(`Authorize this app by visiting this url: ${authUrl}`);

  rl.question('Enter the code from that page here: ', code => {
    rl.close();

    oauth2Client.getToken(code, (err, token) => {
      if(err)
        return console.log('Error while trying to retrieve access token', err);

      oauth2Client.credentials = token;
      fs.writeFile(TOKEN_PATH, JSON.stringify(token));
      callback(oauth2Client);
    });
  });
};

const authorize = (credentials, callback) => {
  const clientSecret = credentials.installed.client_secret;
  const clientId = credentials.installed.client_id;
  const redirectUrl = credentials.installed.redirect_uris[0];
  const auth = new googleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  fs.readFile(TOKEN_PATH, (err, token) => {
    if(err)
      getNewToken(oauth2Client, callback);
    else {
      oauth2Client.credentials = JSON.parse(token);
      callback(oauth2Client);
    }
  });
};

export default callback => {
  authorize(secret, callback);
};
