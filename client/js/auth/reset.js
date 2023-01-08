const axiostInstance = axios.create({
  baseURL: "http://localhost:5000",
});

const resetPassword = async (formData) => {
  const data = await axiostInstance
    .put("/reset-password", formData)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
  return data;
};

$(document).ready(() => {
  const form = $("#reset-form");
  form.submit((event) => {
    event.preventDefault();
    const formData = form.serializeArray();
    const data = formData.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );
    resetPassword(data).then((result) => {
      if (result.success) {
        window.alert("Successfully reset your password.");
        window.location = "login.html";
      }
    });
  });
});
