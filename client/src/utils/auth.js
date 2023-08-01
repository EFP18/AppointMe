import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
<<<<<<< HEAD
    window.location.assign('/calendarpage');
=======
    window.location.assign('/profileview');
>>>>>>> c01801a19a0a2e896bdbf7c77729c280652ac28c
  }

  logout() {
    localStorage.removeItem('id_token');
    // once logged out, redirect to landing page
  }
}

// instead of using an anonymous default export when exporting the AuthService instance,
//  give it a name and then export it as a default module.
const authServiceInstance = new AuthService();
export default authServiceInstance;
