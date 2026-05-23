const token = localStorage.getItem("token");
const currentUserId = localStorage.getItem("userId");

const workspaceMembers = document.getElementById("workspaceMembers");

if (!token) {
  window.location.href = "login.html";
}

const params = new URLSearchParams(window.location.search);

const workspaceId = params.get("id");

const resourceList = document.getElementById("resourceList");

const addResourceBtn = document.getElementById("addResourceBtn");

const workspaceTitle = document.getElementById("workspaceTitle");

const workspaceInfo = document.getElementById("workspaceInfo");

let selectedResourceId = null;

const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");

const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));

const workspaceActions = document.getElementById("workspaceActions");

const confirmLeaveWorkspaceBtn = document.getElementById(
  "confirmLeaveWorkspaceBtn",
);

const leaveWorkspaceModal = new bootstrap.Modal(
  document.getElementById("leaveWorkspaceModal"),
);

const fetchResources = async () => {
  try {
    const response = await fetch(
      //`http://localhost:5000/workspace/${workspaceId}/resources`,
      `${API_BASE_URL}/workspace/${workspaceId}/resources`,

      {
        headers: {
          Authorization: token,
        },
      },
    );

    const resources = await response.json();
    if (resources.length === 0) {
      resourceList.innerHTML = `

        <div class="col-12">

            <div class="card p-5 text-center shadow-sm">

                <h4>No resources yet</h4>

                <p class="text-muted">

                    Add the first study resource

                </p>

            </div>

        </div>

    `;

      return;
    }

    resourceList.innerHTML = "";

    resources.forEach((resource) => {
      resourceList.innerHTML += `

<div class="col-md-4">

    <div class="card shadow-sm h-100 border-0">

        ${
          resource.file && resource.file.match(/\.(jpg|jpeg|png|gif)$/i)
            ? `

            <img

                src="${API_BASE_URL}/uploads/${resource.file}"

                class="card-img-top"

                style="height: 220px; object-fit: cover;"

            >

        `
            : ""
        }

        <div class="card-body d-flex flex-column">

            <h5 class="card-title">

                ${resource.content || "Study Resource"}

            </h5>

            ${
              resource.link
                ? `

                <a

                    href="${resource.link}"

                    target="_blank"

                    class="mb-2"

                >

                    Open Link

                </a>

            `
                : ""
            }

            ${
              resource.file
                ? `

                <a

                    href="${API_BASE_URL}/uploads/${resource.file}"

                    target="_blank"

                    class="mb-3"

                >

                    View File

                </a>

            `
                : ""
            }
            <p class="small text-secondary">
                Uploaded by:${resource.createdBy?.name || "Unknown"}
            </p>
            <p class="text-muted small mt-auto">
                ${new Date(resource.createdAt).toLocaleString()}
            </p>

            ${
              resource.createdBy?._id === currentUserId
                ? `

<button

    class="btn btn-danger btn-sm mt-2"

    onclick="deleteResource('${resource._id}')"

>

    Delete

</button>

`
                : ""
            }

        </div>

    </div>

</div>

`;
    });
  } catch (error) {
    console.log(error);
  }
};
const fetchWorkspaceDetails = async () => {
  try {
    const response = await fetch(
      //`http://localhost:5000/workspace/${workspaceId}`,
      `${API_BASE_URL}/workspace/${workspaceId}`,
      {
        headers: {
          Authorization: token,
        },
      },
    );

    const workspace = await response.json();
    const isCreator = workspace.createdBy._id === currentUserId;
    workspaceTitle.innerText = workspace.workspaceName;
    workspaceActions.innerHTML = !isCreator
      ? `

<button

    class="btn btn-outline-danger btn-sm"

    onclick="openLeaveWorkspaceModal()"

>

    Leave Workspace

</button>

`
      : "";
    workspaceInfo.innerText = `Subject: ${workspace.subject}
             • Created by: ${workspace.createdBy.name}
             • Members: ${workspace.members.length}`;
    workspaceMembers.innerHTML = `

    <h5 class="mb-3">
        Members
    </h5>

    <div class="d-flex flex-wrap gap-2">

        ${workspace.members
          .map(
            (member) => `

            <span class="badge bg-primary p-2">

                ${member.name}

            </span>

        `,
          )
          .join("")}

    </div>

`;
  } catch (error) {
    console.log(error);
  }
};
fetchWorkspaceDetails();
fetchResources();
window.openLeaveWorkspaceModal = () => {
  leaveWorkspaceModal.show();
};
addResourceBtn.addEventListener("click", async () => {
  const content = document.getElementById("content").value;

  const link = document.getElementById("link").value;

  const fileInput = document.getElementById("file");

  const file = fileInput.files[0];

  if (!content && !link && !file) {
    return showToast("Resource cannot be empty");
  }

  const formData = new FormData();

  formData.append("content", content);

  formData.append("link", link);

  if (file) {
    formData.append("file", file);
  }
  addResourceBtn.disabled = true;

  addResourceBtn.innerText = "Uploading...";
  try {
    const response = await fetch(
      //`http://localhost:5000/workspace/${workspaceId}/resource`,
      `${API_BASE_URL}/workspace/${workspaceId}/resource`,
      
      {
        method: "POST",

        headers: {
          Authorization: token,
        },

        body: formData,
      },
    );

    const data = await response.json();

    showToast(data.message);

    fetchResources();
    document.getElementById("content").value = "";

    document.getElementById("link").value = "";

    document.getElementById("file").value = "";
    addResourceBtn.disabled = false;

    addResourceBtn.innerText = "Add Resource";
  } catch (error) {
    console.log(error);
    addResourceBtn.disabled = false;

    addResourceBtn.innerText = "Add Resource";
  }
});

window.deleteResource = async (resourceId) => {
  selectedResourceId = resourceId;

  deleteModal.show();
};
confirmDeleteBtn.addEventListener("click", async () => {
  try {
    const response = await fetch(
      //`http://localhost:5000/resource/${selectedResourceId}`,
      `${API_BASE_URL}/resource/${selectedResourceId}`,

      {
        method: "DELETE",

        headers: {
          Authorization: token,
        },
      },
    );

    const data = await response.json();

    showToast(data.message);

    fetchResources();

    deleteModal.hide();
  } catch (error) {
    console.log(error);
  }
});
confirmLeaveWorkspaceBtn.addEventListener(
  "click",

  async () => {
    try {
      const response = await fetch(
        //`http://localhost:5000/workspace/${workspaceId}/leave`,
        `${API_BASE_URL}/workspace/${workspaceId}/leave`,

        {
          method: "POST",

          headers: {
            Authorization: token,
          },
        },
      );

      const data = await response.json();

      showToast(data.message);

      leaveWorkspaceModal.hide();

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  },
);
