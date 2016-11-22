import ajax from 'utils/ajax';

function loggedIn() {
  return !!localStorage.getItem('user');
}

function confirmed() {
  if (!loggedIn()) {
    return false;
  }

  const user = currentUser();
  return user.confirmed;
}

function currentUser() {
  if (!localStorage.getItem('user')) {
    return null;
  }

  return JSON.parse(localStorage.getItem('user'));
}

function login(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

function logout() {
  localStorage.removeItem('user');
}

export { loggedIn, confirmed, currentUser, login, logout };
