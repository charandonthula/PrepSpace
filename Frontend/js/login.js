const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;
  if (!email || !password) {
    showToast("Please fill all fields");
    return;
  }
  loginBtn.disabled = true;

  loginBtn.innerText = "Logging in...";
  try {
    const response = await fetch(
      //"http://localhost:5000/login",
      `${API_BASE_URL}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("token", data.token);
      const payload = JSON.parse(atob(data.token.split(".")[1]));

      localStorage.setItem(
        "userId",
        payload.userId,
      );

      console.log(localStorage.getItem("token"));

      showToast("Login successful");
      loginBtn.disabled = false;
      loginBtn.innerText = "Login";
      window.location.href = "dashboard.html";
    } else {
      showToast(data.message);
      loginBtn.disabled = false;
      loginBtn.innerText = "Login";
    }
  } catch (error) {
    console.log(error);
    loginBtn.disabled = false;
    loginBtn.innerText = "Login";
  }
});
