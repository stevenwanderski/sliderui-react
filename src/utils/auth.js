import ajax from 'utils/ajax';

export function loggedIn() {
  return !!localStorage.getItem('token');
}

export function currentUser() {
  return ajax.get('/user');
}

export function login(token) {
  localStorage.setItem('token', token);
}

export function logout() {
  localStorage.removeItem('token');
}
