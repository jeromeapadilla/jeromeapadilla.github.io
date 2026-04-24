let webform = document.querySelector("#webform");
let feedback = document.querySelector("#feedback");

webform.addEventListener("submit", (event) => {
  event.preventDefault();

  const webFormData = new FormData(webform);
  fetch("php/insert.php", { body: webFormData, method: "POST" })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        feedback.innerHTML = `<h2>${data.message}</h2>`;
        webform.reset();
      } else {
        feedback.innerHTML = `<h2>${data.message}</h2>`;
      }
    })
    .catch((err) => {
      console.error(err);
      feedback.innerHTML = `<h2>An error occurred while submitting the form.</h2><p>Please check the console or network tab in the developer tools for the error.</p><p>${err}</p>`;
    });
});
