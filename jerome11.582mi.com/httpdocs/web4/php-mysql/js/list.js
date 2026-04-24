let viewFormData = document.querySelector("#viewFormData");
let feedback = document.querySelector("#feedback");

function selectData() {
  fetch("php/select.php")
    .then((res) => res.json())
    .then((data) => {
      for (const item of data) {
        let singleItem = document.createElement("article");
        for (const prop in item) {
          let singleProp = document.createElement("section");
          singleProp.innerHTML = `${prop} : ${item[prop]}`;
          singleItem.appendChild(singleProp);
        }
        viewFormData.appendChild(singleItem);
      }
    })
    .catch((err) => {
      console.error(err);
      feedback.innerHTML = `<h2>An error occurred while fetching the data.</h2><p>Please check the console or network tab in the developer tools for the error.</p><p>${err}</p>`;
    });
}

// run once on page load
selectData();
