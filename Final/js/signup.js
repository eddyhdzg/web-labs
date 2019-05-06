$("#signup_button").on("click", function() {
  // cargar los valores de password, email, name, age

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;

  json_to_send = {
    password: password,
    email: email,
    name: name,
    age: age
  };

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    url: "https://arcane-caverns-75785.herokuapp.com/users/",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "application/json"
    },
    method: "POST",
    dataType: "json",
    data: json_to_send,
    success: function(data) {
      alert("Usuario creado con exito");
      console.log("success: " + data);
      window.location = "./index.html";
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
});
