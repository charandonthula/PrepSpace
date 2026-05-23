const toastContainer = document.getElementById("toastContainer");
window.showToast =(message, type = "success") => {
  const toast = document.createElement("div");

  toast.className = `

        toast align-items-center text-bg-${type}
        border-0 show mb-2

    `;

  toast.innerHTML = `

        <div class="d-flex">

            <div class="toast-body">

                ${message}

            </div>

            <button

                type="button"

                class="btn-close btn-close-white me-2 m-auto"

                onclick="this.parentElement.parentElement.remove()"

            >

            </button>

        </div>

    `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
};
