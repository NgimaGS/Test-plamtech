const forgotPassword = async (formData) => {
  const data = await axiostInstance
    .post(`/forgot-password?email=${formData?.email}`)
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
  return data;
};

$(document).ready(() => {
  const form = $("#forget-password-form");
  form.submit((event) => {
    event.preventDefault();
    const formData = form.serializeArray();
    const data = formData.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );
    forgotPassword(data).then((result) => {
      window.alert(result?.message);
      $("#forgot-password-model").modal("hide");
      window.location = "reset.html";
    });
  });
});
