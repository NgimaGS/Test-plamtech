const axiostInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const register = async (formData) => {
  await axiostInstance
    .post("/register-user", formData)
    .then((response) => {
      if (response.data.success) {
        window.location = "/login";
      }
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
};

$(document).ready(() => {
  const form = $("#register-form");
  form.submit((event) => {
    event.preventDefault();
    const formData = form.serializeArray();
    const data = formData.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );
    register({ ...data, role: data?.isAdmin ? "admin" : "user" });
  });
});
