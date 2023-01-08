const updateImg = async (formData) => {
  const data = await axiostInstance
    .post("/user/upload", formData)
    .then((response) => {
      const result = response.data;
      return result?.data;
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
  return data;
};

$(document).ready(() => {
  const form = $("#upload-image");
  form.submit((event) => {
    event.preventDefault();
    const fileInput = document.getElementById("avatar");
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("image", file);
    updateImg(formData);
  });
});
