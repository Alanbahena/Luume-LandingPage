const subscriptionForm = document.querySelector(".form");
const subscriptionForm2 = document.querySelector(".form_popup");

subscriptionForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    email: email.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/subscription");
  xhr.setRequestHeader("content-type", "application/json");

  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Suscripción con exito");
      email.value = "";
    } else {
      alert("Algo ha ocurrido! Por favor volver a intentar");
    }
  };

  xhr.send(JSON.stringify(formData));
  console.log("HEllo from the script");
});

subscriptionForm2.addEventListener("submit", (e) => {
  e.preventDefault();

  let formData = {
    email: email.value,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "/subscription");
  xhr.setRequestHeader("content-type", "application/json");

  xhr.onload = function () {
    console.log(xhr.responseText);
    if (xhr.responseText == "success") {
      alert("Suscripción con exito");
      email.value = "";
    } else {
      alert("Algo ha ocurrido! Por favor volver a intentar");
    }
  };

  xhr.send(JSON.stringify(formData));
  console.log("HEllo from the script");
});
