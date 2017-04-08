'use strict';

const path = require('path');
const url = require('url');
const process = require('process');
const {app, BrowserWindow} = require('electron');

let win;
const createWindow = () => {
  win = new BrowserWindow({width: 800, height: 600});

<% if(server) { -%>
  process.env.NODE_ENV = 'production';
  process.env.PORT = 8000;

  require('./lib/server');
  win.loadURL('http://localhost:8000/');
<% } else { -%>
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
<% } -%>

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin')
    app.quit();
});

app.on('activate', () => {
  if(win === null)
    createWindow();
});
