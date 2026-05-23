const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;

  const email = document.getElementById("email").value;

  const password = document.getElementById("password").value;
  if (!name || !email||!password) {
    showToast("Please fill all fields");
    return;
  }
  signupBtn.disabled = true;
  signupBtn.innerText = "Creating...";
  try {
    const response = await fetch(
      //"http://localhost:5000/signup",
      `${API_BASE_URL}/signup`,

      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          password,
        }),
      },
    );

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      showToast("Signup successful");
      signupBtn.disabled = true;
      signupBtn.innerText = "Creating...";
      window.location.href = "login.html";
    } else {
      showToast(data.message);
      signupBtn.disabled = true;
      signupBtn.innerText = "Creating...";
    }
  } catch (error) {
    console.log(error);
    signupBtn.disabled = true;
    signupBtn.innerText = "Creating...";
  }
});
