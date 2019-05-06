$("#signup_button").on("click", function() {
  // cargar los valores de password, email, name, age
  /*
  json_to_send = {
    password: password,
    email: email,
    name: name,
    age: age
  };
  */

  json_to_send = {
    email: "test4@valido.com",
    password: "qwerty123",
    age: 123,
    name: "miguel"
  };

  console.log(json_to_send);

  json_to_send = JSON.stringify(json_to_send);

  $.ajax({
    // url: "http://localhost:3000/users",
    url: "http://localhost:3000/users/",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "application/json"
    },
    mode: "no-cors",
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
