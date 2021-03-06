# Password Vault

> Web app to allow saving app passwords

## Pre-requisites
> NPM

## Create a single page OIDC app in Okta

> 1. Go to Admin console, Applications tab and Choose 'Add Applications' button. 
> 2. Select 'Create New App' option. Platform should be set to 'Single Page App (SPA)'.
> 3. Set the application name as 'Password Vault'
> 4. Set the login redirect uri to be the web app's URI (e.g. http://hostname:port/implicit/callback where hostname can be localhost and port can be 8080)
> 5. Set the initiate login uri as http://hostname:port (e.g. http://localhost:8080)
> 6. Save the settings and assign the app to all users who need access to Password Vault.

## Server App Setup
Download the zip file and unzip under desired location. Go to the folder 'PacificDental-master'  
Go to the file src/server.js and update the following values

> const orgURL = 'https://pacificdental.oktapreview.com'  
> const sswsToken = '00cSwekKpTT0X9lESRSTHSTJgw1ypkCH2tmGxWeXv' (This should an admin API token)  
> const client = '0oaeyy53nggBiZ33a0h7' (client ID of the Password Vault app created in Okta)  
> const host = 'http://localhost' (hostname for server app)  
> const port = '8081' (port for server app)
 
Save changes

Go to the file src/api.js and update the base URL

> baseURL: 'http://localhost:8081/'

Save changes

Install server dependencies from terminal

> npm i express@4.16.3 cors@2.8.4 @okta/jwt-verifier@0.0.11 axios@0.18.0

Start the server

> node ./src/server

## web-app setup
Go to the file src/router/index.js and update the following values

> const client = '0oaeyy53nggBiZ33a0h7'  
> const orgURL = 'https://pacificdental.oktapreview.com'  
> const baseRedirect = 'http://localhost:8080'  

Save changes

Go to the file build/dev-server.js and update the following host value

> const uri = 'http://localhost:' + port

Save changes

Go to the file config/index.js and update the port value. Save changes.

From another terminal window, install vue-cli, bootstrap and Okta SDK

> npm i bootstrap-vue@2.0.0-rc.7 bootstrap@4.1.0 @okta/okta-vue@1.0.0 vue-cli@2.9.3

Start server

> npm run dev
