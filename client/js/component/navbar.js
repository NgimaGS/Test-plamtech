var token = window.getCookie("app-token");

const axiostInstance = axios.create({
  baseURL: "http://localhost:5000",
  headers: { Authorization: token },
});

const getMetadata = async () => {
  const metadata = await axiostInstance
    .get("/user/metadata")
    .then((response) => {
      const result = response.data;
      let imageString = "";
      new Uint8Array(result?.data?.profile_image?.data?.data).forEach(function (
        charCode
      ) {
        imageString += String.fromCharCode(charCode);
      });
      let profile_img = btoa(imageString);
      return { ...result?.data, profile_image: profile_img };
    })
    .catch(function (error) {
      console.log(error);
      window.alert(
        error?.response.data?.message || "some unsual error occured"
      );
    });
  return metadata;
};

$(document).ready(() => {
  getMetadata().then((user) => {
    window.userRole = user?.role;
    $("#header").append(`
  <nav class="header-nav ms-auto">
    <ul class="d-flex align-items-center">
    <li class="nav-item dropdown pe-3">
      <a
        class="nav-link nav-profile d-flex align-items-center pe-0"
        href="#"
        data-bs-toggle="dropdown"
      >
        <img src="data:image/png;base64, ${user?.profile_image}" alt="Profile" class="rounded-circle" />
        <span class="d-none d-md-block dropdown-toggle ps-2"
          >${user?.name}</span
        > </a
      ><!-- End Profile Iamge Icon -->

      <ul
        class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile"
      >
        <li class="dropdown-header">
          <h6>${user?.name}</h6>
          <span>${user?.role}</span>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a
            class="dropdown-item d-flex align-items-center"
            href="/index.html"
          >
            <i class="bi bi-house"></i>
            <span>Home</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a
            class="dropdown-item d-flex align-items-center"
            href="/profile.html"
          >
            <i class="bi bi-person"></i>
            <span>My Profile</span>
          </a>
        </li>
        <li>
          <hr class="dropdown-divider" />
        </li>
        <li>
          <a
            class="dropdown-item d-flex align-items-center"
            href="/login.html"
          >
            <i class="bi bi-box-arrow-right"></i>
            <span>Sign Out</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</nav>
  `);
  });
});
