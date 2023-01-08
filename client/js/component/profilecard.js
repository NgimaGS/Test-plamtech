$(document).ready(() => {
  getMetadata().then((user) => {
    window.userRole = user?.role;
    $("#profile-card").append(`
    <div
    class="card-body profile-card pt-4 d-flex flex-column align-items-center"
  >
    <img
      src="data:image/png;base64, ${user?.profile_image}"
      alt="Profile"
      height="140"
      class="rounded-circle"
    />
    <h2 id="profile-title-name">${user?.name}</h2>
    <h3>${user?.role}</h3>
  </div>
    `);

    $("#profile-overview").append(`
    <div class="row">
    <div class="col-lg-3 col-md-4 label">Full Name</div>
    <div class="col-lg-9 col-md-8">${user?.name}</div>
  </div>

  <div class="row">
    <div class="col-lg-3 col-md-4 label">Role</div>
    <div class="col-lg-9 col-md-8">${user?.role}</div>
  </div>

  <div class="row">
    <div class="col-lg-3 col-md-4 label">Address</div>
    <div class="col-lg-9 col-md-8">
      ${user?.address}
    </div>
  </div>

  <div class="row">
    <div class="col-lg-3 col-md-4 label">Phone</div>
    <div class="col-lg-9 col-md-8">${user?.contact_no}</div>
  </div>

  <div class="row">
    <div class="col-lg-3 col-md-4 label">Email</div>
    <div class="col-lg-9 col-md-8">
      ${user?.email}
    </div>
  </div>
    `);
    $("#profile-edit").append(` 
    <form id="profile-edit-form">
    <div class="row mb-3">
      <label
        for="profileImage"
        class="col-md-4 col-lg-3 col-form-label"
        >Profile Image</label
      >
      <div class="col-md-8 col-lg-9">
        <div class="pt-2">
        <div class="input-group mb-3">
        <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg" class="form-control" id="inputGroupFile01">
      </div>
      <Button class="btn btn-outline-secondary" type="button" id="upload-img">Upload</Button>      
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <label
        for="name"
        class="col-md-4 col-lg-3 col-form-label"
        >Full Name</label
      >
      <div class="col-md-8 col-lg-9">
        <input
          name="name"
          type="text"
          class="form-control"
          id="name"
          value="${user?.name}"
        />
      </div>
    </div>

    <div class="row mb-3">
      <label
        for="Address"
        class="col-md-4 col-lg-3 col-form-label"
        >Address</label
      >
      <div class="col-md-8 col-lg-9">
        <input
          name="address"
          type="text"
          class="form-control"
          id="address"
          value="${user?.address}"
        />
      </div>
    </div>

    <div class="row mb-3">
      <label
        for="Contact"
        class="col-md-4 col-lg-3 col-form-label"
        >Phone</label
      >
      <div class="col-md-8 col-lg-9">
        <input
          name="contact_no"
          type="text"
          class="form-control"
          id="contact_no"
          value="${user?.contact_no}"
        />
      </div>
    </div>

    <div class="row mb-3">
      <label
        for="Email"
        class="col-md-4 col-lg-3 col-form-label"
        >Email</label
      >
      <div class="col-md-8 col-lg-9">
        <input
          name="email"
          type="email"
          class="form-control"
          id="email"
          value="${user?.email}"
        />
      </div>
    </div>

    <div class="text-end">
      <button type="submit" class="btn btn-primary">
        Save Changes
      </button>
    </div>
  </form>`);
  });
});
