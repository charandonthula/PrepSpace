const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html";
}

const workspaceList = document.getElementById("workspaceList");

const createWorkspaceBtn = document.getElementById("createWorkspaceBtn");

const logoutBtn = document.getElementById("logoutBtn");

const joinWorkspaceBtn = document.getElementById("joinWorkspaceBtn");

// const toastContainer = document.getElementById("toastContainer");

let selectedWorkspaceId = null;

const confirmWorkspaceDeleteBtn = document.getElementById(
  "confirmWorkspaceDeleteBtn",
);

const workspaceDeleteModal = new bootstrap.Modal(
  document.getElementById("workspaceDeleteModal"),
);
const confirmLogoutBtn = document.getElementById("confirmLogoutBtn");

const logoutModal = new bootstrap.Modal(document.getElementById("logoutModal"));

// logoutBtn.addEventListener("click", () => {
//   localStorage.removeItem("token");

//   window.location.href = "login.html";
// });

logoutBtn.addEventListener("click", () => {
  logoutModal.show();
});
confirmLogoutBtn.addEventListener(
  "click",

  () => {
    localStorage.removeItem("token");

    localStorage.removeItem("userId");

    window.location.href = "login.html";
  },
);
const fetchWorkspaces = async () => {
  try {
    const response = await fetch(
      // "http://localhost:5000/my-workspaces",
      `${API_BASE_URL}/my-workspaces`,

      {
        headers: {
          Authorization: token,
        },
      },
    );

    const workspaces = await response.json();

    workspaceList.innerHTML = "";

    workspaces.forEach((workspace) => {
      workspaceList.innerHTML += `

    <div class="col-md-4">

        <div class="card shadow-sm p-3 h-100">

            <h5>${workspace.workspaceName}</h5>

            <p class="text-muted">

                ${workspace.subject}

            </p>

            <p class="small text-secondary">

                ID: ${workspace._id}

            </p>
            <button

            class="btn btn-outline-secondary btn-sm mt-2" onclick="copyWorkspaceId('${workspace._id}')">
                Copy Workspace ID
            </button>
            <button class="btn btn-primary mt-2" onclick="openWorkspace('${workspace._id}')">
                Open Workspace
            </button>
            <button class="btn btn-danger mt-2" onclick="deleteWorkspace('${workspace._id}')">
                Delete
            </button>
        </div>
    </div>
`;
    });
  } catch (error) {
    console.log(error);
  }
};

fetchWorkspaces();

createWorkspaceBtn.addEventListener("click", async () => {
  const workspaceName = document.getElementById("workspaceName").value;

  const subject = document.getElementById("subject").value;
  if (!workspaceName || !subject) {
    return showToast("Please fill all fields");
  }
  createWorkspaceBtn.disabled = true;

  createWorkspaceBtn.innerText = "Creating...";
  try {
    const response = await fetch(
      // "http://localhost:5000/create-workspace",
      `${API_BASE_URL}/create-workspace`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: token,
        },

        body: JSON.stringify({
          workspaceName,
          subject,
        }),
      },
    );

    const data = await response.json();

    showToast(data.message);

    fetchWorkspaces();
    document.getElementById("workspaceName").value = "";
    document.getElementById("subject").value = "";
    createWorkspaceBtn.disabled = false;

    createWorkspaceBtn.innerText = "Create Workspace";
  } catch (error) {
    console.log(error);
    createWorkspaceBtn.disabled = false;

    createWorkspaceBtn.innerText = "Create Workspace";
  }
});
joinWorkspaceBtn.addEventListener("click", async () => {
  const workspaceId = document.getElementById("joinWorkspaceId").value;

  if (!workspaceId) {
    return showToast("Please enter workspace ID");
  }

  try {
    const response = await fetch(
      // `http://localhost:5000/workspace/${workspaceId}/join`,
      `${API_BASE_URL}/workspace/${workspaceId}/join`,

      {
        method: "POST",

        headers: {
          Authorization: token,
        },
      },
    );

    const data = await response.json();

    showToast(data.message);

    fetchWorkspaces();
  } catch (error) {
    console.log(error);
  }
});
// window.deleteWorkspace = async (workspaceId) => {
//   const confirmDelete = confirm(
//     "Are you sure you want to delete this workspace?",
//   );

//   if (!confirmDelete) {
//     return;
//   }
//   try {
//     const response = await fetch(
//       `http://localhost:5000/workspace/${workspaceId}`,

//       {
//         method: "DELETE",

//         headers: {
//           Authorization: token,
//         },
//       },
//     );

//     const data = await response.json();

//     showToast(data.message);

//     fetchWorkspaces();
//   } catch (error) {
//     console.log(error);
//   }
// };
window.deleteWorkspace = async (workspaceId) => {
  selectedWorkspaceId = workspaceId;

  workspaceDeleteModal.show();
};
confirmWorkspaceDeleteBtn.addEventListener(
  "click",

  async () => {
    try {
      const response = await fetch(
        //`http://localhost:5000/workspace/${selectedWorkspaceId}`,
        `${API_BASE_URL}/workspace/${selectedWorkspaceId}`,

        {
          method: "DELETE",

          headers: {
            Authorization: token,
          },
        },
      );

      const data = await response.json();

      showToast(data.message);

      fetchWorkspaces();

      workspaceDeleteModal.hide();
    } catch (error) {
      console.log(error);
    }
  },
);
window.openWorkspace = (workspaceId) => {
  window.location.href = `workspace.html?id=${workspaceId}`;
};
window.copyWorkspaceId = async (workspaceId) => {
  try {
    await navigator.clipboard.writeText(workspaceId);

    showToast("Workspace ID copied");
  } catch (error) {
    console.log(error);
  }
};
// const showToast = (message, type = "success") => {
//   const toast = document.createElement("div");

//   toast.className = `

//         toast align-items-center text-bg-${type}
//         border-0 show mb-2

//     `;

//   toast.innerHTML = `

//         <div class="d-flex">

//             <div class="toast-body">

//                 ${message}

//             </div>

//             <button

//                 type="button"

//                 class="btn-close btn-close-white me-2 m-auto"

//                 onclick="this.parentElement.parentElement.remove()"

//             >

//             </button>

//         </div>

//     `;

//   toastContainer.appendChild(toast);

//   setTimeout(() => {
//     toast.remove();
//   }, 3000);
// };
