window.setCookie = function (name, value) {
  let expires = "";

  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  expires = "; expires=" + date.toUTCString();

  document.cookie = `${name}=${value || ""}${expires}; path=/; SameSite=Strict`;
};

window.getCookie = function (name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

window.removeCookie = function (name) {
  setCookie(name, "", -1);
};
