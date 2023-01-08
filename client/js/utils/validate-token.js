$(document).ready(() => {
  const token = window.getCookie("app-token");
  if (!token) {
    window.location = "/login.html";
  }
});
