import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'metaphornado.auth0.com',
    clientID: 'wIbnkKVeXh-9wgcNK4hHuZ9dETQsLOrT',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://metaphornado.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  login = () => {
    this.auth0.authorize();
  }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.log(err);
      }
    });
  }
}