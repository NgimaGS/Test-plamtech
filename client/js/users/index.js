var token = window.getCookie("app-token");

const getUsers = async () => {
  const dataList = await axiostInstance
    .get("/user")
    .then((response) => {
      const result = response.data;
      return result?.data;
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
  return dataList;
};

const updateUser = async (formData) => {
  const data = await axiostInstance
    .put("/user", formData)
    .then((response) => {
      const result = response.data;
      return result?.data;
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
  return data;
};

const deleteUser = async (email) => {
  const data = await axiostInstance
    .delete(`/user?email=${email}`)
    .then((response) => {
      const result = response.data;
      return result?.data;
    })
    .catch(function (error) {
      window.alert(error.response.data?.message);
    });
  return data;
};

function onEditClick() {
  const row = $(this).closest("tr");
  const name = row.find(".name").text();
  const email = row.find(".email").text();
  const contact_no = row.find(".contact_no").text();
  const address = row.find(".address").text();
  const role = row.find(".role").text();

  $("#editModal").find("#yourName").val(name);
  $("#editModal").find("#yourEmail").val(email);
  $("#editModal").find("#yourRole").val(role);
  $("#editModal").find("#yourContact").val(contact_no);
  $("#editModal").find("#yourAddress").val(address);
  $("#editModal")
    .find("#admin-cb")
    .prop("checked", role === "admin" ? true : false);

  $("#editModal").modal("show");

  const form = $("#edituser-form");
  form.submit((event) => {
    event.preventDefault();
    const formData = form.serializeArray();
    console.log(formData);
    const data = formData.reduce(
      (acc, { name, value }) => ({ ...acc, [name]: value }),
      {}
    );
    updateUser({ ...data, role: data?.isAdmin ? "admin" : "user" }).then(
      (data) => {
        row.find(".name").html(data?.name);
        row.find(".email").html(data?.email);
        row.find(".contact_no").html(data?.contact_no);
        row.find(".address").html(data?.address);
        row.find(".role").html(data?.role);
        $("#editModal").modal("hide");
      }
    );
  });
}

function onDeleteClick() {
  const email = $(this).data("id");
  if (email) {
    window.confirm("Do you want to delete this user?")
      ? deleteUser(email).then(() => {
          $(this).closest("tr").remove();
        })
      : window.alert("User deletion was cancelled");
  }
}

function setTableData() {
  const tableData = getUsers().then((dataList) =>
    dataList?.map((user, index) => {
      $("#user-table > tbody:last-child").append(`
    <tr row_id="${user?.email}">
        <td scope="row">${index + 1}</td>
        <td class="name">${user?.name}</td>
        <td class="email">${user?.email}</td>
        <td class="contact_no">${user?.contact_no}</td>
        <td class="address">${user?.address}</td>
        <td class="role">${user?.role}</td>
        ${
          window.userRole === "admin"
            ? `<td><Button class="btn btn-outline-info edit-button" data-id=${user?.email}>Edit</Button></td>
        <td><Button class="btn btn-outline-danger delete-button" data-id=${user?.email}>Delete</Button></td></td>
      `
            : ``
        }
    </tr>
    `);
    })
  );
  return tableData;
}

$(document).ready(() => {
  setTableData().then(() => {
    $(".edit-button").click(onEditClick);
    $(".delete-button").click(onDeleteClick);
  });
});
