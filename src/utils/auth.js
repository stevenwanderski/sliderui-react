import ajax from 'utils/ajax';

export default {
  loggedIn() {
    return !!localStorage.getItem('token');
  },

  currentUser() {
    return ajax.get('/user');
  },

  logout() {
    localStorage.removeItem('token');
  }
}
