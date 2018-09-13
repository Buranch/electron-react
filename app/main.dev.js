/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import fs from 'fs';
import util from 'util';
import xml2js from 'xml2js';
import {
  app,
  BrowserWindow,
  ipcMain,
  ipc
} from 'electron';
import MenuBuilder from './menu';

let mainWindow = null;
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const getFolderLocation = () => {
  console.log('get folder location');
  console.log('dirname', __dirname);
  let fullPathToSetting = `\\AppData\\Local\\trixbox\\eyeBeam`;
  console.log('home', process.env.HOME);

  return fs.readdir(process.env.HOME + fullPathToSetting, (err, files) => {
    let xml = null;
    files.every(file => {
      console.log(file);

      fullPathToSetting = `${process.env.HOME + fullPathToSetting}\\${file}\\settings.cps`;
      console.log('fullPath ', fullPathToSetting);
      const parser = new xml2js.Parser();
      return fs.readFile(fullPathToSetting, (err2, data) => {
        parser.parseString(data, (err3, result) => {
          console.dir(result);
          // console.log(util.inspect(result, false, null))
          console.log('Done');
          xml = result;
          return false;
        });
      });
    });
    return xml;
  });




  // ipcMain.on('folder', (event, msg, single) => {
  //   console.log('folderer');

  // })
}


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    // width: 1024,
    // height: 728,
    width: 360,
    height: 170,
    transparent: true,
    resizable: false,
    frame: false,
    icon: path.join(__dirname, '../resources/icon.png')
  });
  process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  ipcMain.on('xml', (event, arg) => {
    console.log('msg', arg);
    // console.log('sending ', getFolderLocation());


    console.log('get folder location');
    console.log('dirname', __dirname);
    let fullPathToSetting = `\\AppData\\Local\\trixbox\\eyeBeam`;
    console.log('home', process.env.HOME);

    fs.readdir(process.env.HOME + fullPathToSetting, (err, files) => {
      if(err) console.log('error man while finding folder');
      files.every(file => {
        console.log(file);
        fullPathToSetting = `${process.env.HOME + fullPathToSetting}\\${file}\\settings.cps`;
        console.log('fullPath ', fullPathToSetting);
        const parser = new xml2js.Parser();
        return fs.readFile(fullPathToSetting, (err2, data) => {
          if(err2) console.log('err man while reading');
          parser.parseString(data, (err3, result) => {
            console.dir(result);
            // console.log(util.inspect(result, false, null))
            event.sender.send('xml', result);
            console.log('Done');
            return false;
          });
        });
      });
     });
  });
  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
      // getFolderLocation();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});
