// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // check if admin's logged in
  adminLoggedIn() {
    // Checks if there is a saved token and it's still valid
    const adminToken = this.getAdminToken();
    return !!adminToken && !this.isTokenExpired(adminToken);
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // check if token is expired
  isAdminTokenExpired(adminToken) {
    try {
      const decoded = decode(adminToken);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  getAdminToken() {
    // Retrieves the admin token from localStorage
    return localStorage.getItem('admin_id_token');
  }

  login(idToken) {
    // Since an admin can also have a normal user account, the admin may forget to logout as an admin before trying to login in as a user. 
    // The tokens will conflict if both are set in localStorage, so before we login as a user we check to see if there is an adminToken. If there is, we remove it and proceed with user login.
    const adminToken = this.getAdminToken();
    if (adminToken) {
      localStorage.removeItem('admin_id_token');
    }
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard');

  }

  adminLogin(adminToken) {
    // Make sure user is not logged in before attempting to login admin
    const token = this.getToken();
    if (token) {
      localStorage.removeItem('id_token');
    }
    // Saves admin token to localStorage
    localStorage.setItem('admin_id_token', adminToken);
    window.location.assign('/contentcreator');

  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/home');
  }

  adminLogout() {
    localStorage.removeItem('admin_id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/home');
  }


}

export default new AuthService();
