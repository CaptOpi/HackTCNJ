let email = '';
let password = '';

export function setEmailAddress(e) {
  email = e;
}

export function setPass(p) {
  password = p;
}

export function getEmail() {
  return email;
}

export function getPass() {
  return password;
}