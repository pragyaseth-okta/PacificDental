const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const OktaJwtVerifier = require('@okta/jwt-verifier')


const orgURL = 'https://seth.oktapreview.com'
const sswsToken = '00cSwekKpTT0X9SRTaerhRtgw1ypkCH2tmGxWeXv'
const client = '0oaeyy53nggBiZ33a0h7'
const host = 'http://localhost'
const port = '8081'
const hostURL = host + ':' + port

const createAppURL = orgURL + '/api/v1/apps'
const axios = require('axios')
var userID
var status



const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: client,
  issuer: orgURL + '/oauth2/default'
})

let app = express()
app.use(cors())
app.use(bodyParser.json())

// verify JWT token middleware

app.use((req, res, next) => {
  // require every request to have an authorization header
  if (!req.headers.authorization) {
    return next(new Error('Authorization header is required'))
  }
  let parts = req.headers.authorization.trim().split(' ')
  let accessToken = parts.pop()
  oktaJwtVerifier.verifyAccessToken(accessToken)
    .then(jwt => {
      req.user = {
        uid: jwt.claims.uid,
        email: jwt.claims.sub
      }
      userID = jwt.claims.uid
      next()
    })
    .catch(next) // jwt did not verify!
})

app.post('/submitApp', async function(req, res){

  const appData = `{"label": "${req.body.appName}",
                    "status": "ACTIVE",
                    "signOnMode": "AUTO_LOGIN",
                    "accessibility": {
                       "selfService": true },
                     "visibility": {
                      "autoSubmitToolbar": false,
                      "hide": {
                          "iOS": false,
                          "web": false
                      }
                     },
                  "credentials": {
                      "scheme": "EDIT_USERNAME_AND_PASSWORD",
                      "revealPassword": true
                    },
                "settings": {
                      "app": {},
                      "signOn": {
                          "redirectUrl": "",
                          "loginUrl": "${req.body.appUrl}"
                      }
                  }
              }`
    //console.log("Appdata string" + appData)

    const userData = `{
                   "id": "${userID}",
                   "scope": "USER",
                   "credentials": {
                     "userName": "${req.body.userName}",
                     "password": "${req.body.password}"
                   }
                 }`
  var statusText = ''

  await axios.post(createAppURL, appData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `SSWS ${sswsToken}`,
          'Access-Control-Allow-Origin': `${hostURL}`
          }
        }).then(async function(res){

                  appID = res.data.id

                  //console.log("AppId is: " + appID)


                  var addUserURL = createAppURL + "/" + appID + "/users";

                  //console.log("Add user URL:", addUserURL);

                  // get status text
                  status = res.statusText;

                  await axios.post(addUserURL, userData, {headers: {
                                         'Accept': 'application/json',
                                         'Content-Type': 'application/json',
                                         'Authorization': `SSWS ${sswsToken}`,
                                         'Access-Control-Allow-Origin': `${hostURL}`
                                       }}).then((res) => {

                                        //console.log(res);
                                        // get status text
                                        status = res.statusText;

                                      }).catch((error) => {
                                          status = error
                                          console.log("Add user error is: " + status)
                                        })

                }).catch((error) => {
                    status = error
                    console.log("Add app error is: " + status)
                  })
    //console.log("status is : " + status)
    res.send(status)
})


//launches the app on :8081
app.listen(port, () => {
  console.log('listening to ' + hostURL)
})
