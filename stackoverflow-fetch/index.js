'use strict';

require('dotenv').config();

const createApplication = require('../index.js');
const { AuthorizationCode } = require('simple-oauth2');

const stackoverflow = require('./authentication.js');

const clientId = process.env.STACKOVERFLOW_OAUTH_CLIENT_ID;
const clientSecret = process.env.STACKOVERFLOW_OAUTH_CLIENT_SECRET;
const clientKey = process.env.STACKOVERFLOW_OAUTH_KEY;

createApplication(({ app, callbackUrl }) => {  
  const client = new AuthorizationCode({
    client: {
      id: clientId,
      secret: clientSecret,
    },
    auth: {
      tokenHost: 'https://stackoverflow.com',
      authorizeHost: 'https://stackoverflow.com',
      authorizePath: 'https://stackoverflow.com/oauth',
    }
  });

  // Authorization uri definition
  const authorizationUri = client.authorizeURL({
    redirect_uri: callbackUrl,
    state: '3(#0/!~',
  });

  // Initial page redirecting to Github
  app.get('/auth', (req, res) => {
    console.log('authorizationUri:', authorizationUri);
    res.redirect(authorizationUri);
  });

  // Callback service parsing the authorization token and asking for the access token
  app.get('/callback', async (req, res) => {
    const { code } = req.query;
    const obj = {
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: callbackUrl,
    };

    try {      
      const accessToken = await stackoverflow.getToken(code, callbackUrl);
      return res.status(200).json(accessToken);  
    } catch (error) {
      console.error('Access Token Error', error.message);
      return res.status(500).json('Authentication failed');
    }
  });

  app.get('/', (req, res) => {
    res.send('Hello<br><form action="/auth"><button>Log in with Stack Overflow</button></form>');
  });
});
