function handleGetJson() {
  console.log("inside handleGetJson");
  fetch("../data/grammys.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
  return;
}

handleGetJson();
