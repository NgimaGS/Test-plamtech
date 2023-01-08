const axiostInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const login = async (formData) => {
  const data = await axiostInstance
    .post("/login", formData)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
  return data;
};

$(document).ready(() => {
  window.removeCookie("app-token");
  const form = $("#login-form");
  form.submit((event) => {
    event.preventDefault();
    const formData = form.serializeArray();
    const data = formData.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );
    login(data).then((result) => {
      window.setCookie("app-token", result?.data?.token);
      window.location = "index.html";
    });
  });
});
