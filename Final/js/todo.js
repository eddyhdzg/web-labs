var token = localStorage.getItem("token");
if (token) {
  token = token.replace(/^"(.*)"$/, "$1"); // Remove quotes from token start/end.
}

var todos = document.querySelectorAll("input[type=checkbox]");

function updateTodo(id, completed) {
  // revisen si completed es booleano o string
  json_to_send = {
    completed: completed
  };
  json_to_send = JSON.stringify(json_to_send);
  $.ajax({
    url: "http://localhost:3000/todos/" + id,
    // url: 'https://tuapp.herokuapp.com/todos',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    method: "PATCH",
    dataType: "json",
    data: json_to_send,
    success: function(data) {
      console.log("UPDATE!!");
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

function loadTodos() {
  $.ajax({
    url: "https://arcane-caverns-75785.herokuapp.com/todos",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    method: "GET",
    dataType: "json",
    success: function(data) {
      // console.log(data);

      for (let i = 0; i < data.length; i++) {
        addTodo(data[i]._id, data[i].description, data[i].completed);
      }
    },
    error: function(error_msg) {
      alert(error_msg["responseText"]);
    }
  });
}

loadTodos();

// o con jquery
// $('input[name=newitem]').keypress(function(event){
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if(keycode == '13'){
//         $.ajax({})
//     }
// });

var input = document.querySelector("input[name=newitem]");

input.addEventListener("keypress", function(event) {
  if (event.charCode === 13) {
    json_to_send = {
      description: input.value
    };
    json_to_send = JSON.stringify(json_to_send);
    $.ajax({
      url: "http://localhost:3000/todos",
      // url: 'https://tuapp.herokuapp.com/todos',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      method: "POST",
      dataType: "json",
      data: json_to_send,
      success: function(data) {
        console.log(data);
      },
      error: function(error_msg) {
        alert(error_msg["responseText"]);
      }
    });
    input.value = "";
  }
});

function addTodo(id, todoText, completed) {
  console.log(id);
  console.log(todoText);
  console.log(completed);

  var li = document.createElement("li"); // Create a <li> element
  var input = document.createElement("input"); // Create a <input> element
  var span = document.createElement("span"); // Create a <span> element

  span.innerHTML = todoText;

  input.setAttribute("type", "checkbox");
  input.setAttribute("name", "todo");
  input.setAttribute("value", "id");

  li.appendChild(input);
  li.appendChild(span);

  console.log(li);

  document.getElementById("unfinished-list").appendChild(li);
}
