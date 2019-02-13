document.addEventListener("DOMContentLoaded", function(event) {
  var input = document.getElementById("newitem");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      newElement();
    }
  });

  // Create a "close" button and append it to each list item
  var myNodelist = document.getElementsByTagName("li");
  for (var i = 0; i < myNodelist.length; i++) {
    var img = document.createElement("img");
    img.className = "close";
    img.setAttribute("src", "./assets/clear.svg");
    img.setAttribute("alt", "clear-icon");
    myNodelist[i].appendChild(img);
  }

  // Click on a close button to hide the current list item
  var close = document.getElementsByClassName("close");
  for (var i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      this.parentElement.remove();
      completed();
    };
  }

  newElement = () => {
    let inputValue = input.value;

    if (inputValue === "") alert("Input is empty!");
    else {
      let id = Date.now();
      let inputNode = document.createTextNode(inputValue);

      // Genrate List
      let li = document.createElement("li");

      // Generate Label
      let label = document.createElement("label");
      label.setAttribute("for", id);
      label.appendChild(inputNode);

      // Generate
      let checkbox = document.createElement("input");
      checkbox.setAttribute("id", id);
      checkbox.setAttribute("type", "checkbox");
      checkbox.className = "material_checkbox";
      checkbox.setAttribute("onchange", "check(this)");

      // Apend to list
      li.appendChild(checkbox);
      li.appendChild(label);

      document.getElementById("tasks").appendChild(li);
      document.getElementById("newitem").value = "";

      var img = document.createElement("img");
      img.className = "close";
      img.setAttribute("src", "./assets/clear.svg");
      img.setAttribute("alt", "clear-icon");

      li.appendChild(img);

      for (var i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          this.parentElement.remove();
          completed();
        };
      }
    }
  };
});

// Function that is called when the checkbox is clicked (onchange)
check = checkboxElem => {
  if (checkboxElem.checked) {
    document
      .getElementById("completed")
      .appendChild(checkboxElem.parentElement);
  } else {
    document.getElementById("tasks").appendChild(checkboxElem.parentElement);
  }
  completed();
};

// Function to hide header "completed" if there are none completed, and show if there are one or more
completed = () => {
  let list = document.getElementById("completed");
  if (list.children.length === 0)
    document.getElementById("completed-h3").style.display = "none";
  else document.getElementById("completed-h3").style.display = "block";
};
