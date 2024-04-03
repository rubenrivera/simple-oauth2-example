'use strict';

const createApplication = require('.');
const { AuthorizationCode } = require('simple-oauth2');

require('dotenv').config();

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
      tokenPath: 'https://stackoverflow.com/oauth/access_token/json',
      authorizePath: 'https://stackoverflow.com/oauth',
    },
    options: {
      authorizationMethod: 'body',
    },
    http: {
      'headers.authorization': 'headers.Accept = application/x-www-form-urlencoded'
    }
  });

  // Authorization uri definition
  const authorizationUri = client.authorizeURL({
    redirect_uri: callbackUrl,
    state: '3(#0/!~',
  });

  // Initial page redirecting to Github
  app.get('/auth', (req, res) => {
    console.log(authorizationUri);
    res.redirect(authorizationUri);
  });

  // Callback service parsing the authorization token and asking for the access token
  app.get('/callback', async (req, res) => {
    const { code } = req.query;
    const options = {
      code,
      client_client: clientId,
      client_secret: clientSecret,
      redirect_uri: callbackUrl,
    };

    try {
      const accessToken = await client.getToken(options);
      
      console.info(accessToken);

      console.log('The resulting token: ', accessToken.token);

      return res.status(200).json(accessToken.token);
    } catch (error) {
      console.error('Access Token Error', error.message, error.stack);
      return res.status(500).json('Authentication failed');
    }
  });

  app.get('/', (req, res) => {
    res.send('Hello<br><a href="/auth">Log in with Stack Overflow</a>');
  });
});
