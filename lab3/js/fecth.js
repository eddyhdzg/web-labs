function handleGetJson() {
  console.log("inside handleGetJson");
  fetch("../data/grammys.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(data => {
      console.log(data);
    });
  return;
}

handleGetJson();
