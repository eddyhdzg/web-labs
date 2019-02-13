$.ajax({
  url: "data/grammys.json",
  type: "GET",
  dataType: "json",
  success: function(data) {
    let new_html = "";

    for (let i = 0; i < data.fields.length; i++) {
      new_html += `
        <option value="${data.fields[i].field_id - 1}">
          ${data.fields[i].field}
        </option>
      `;
    }

    $("#category_types").append(new_html);
    loadNominees();
  },
  error: function(error_msg) {
    console.log(error_msg);
  }
});

function loadNominees() {
  $.ajax({
    url: "data/grammys.json",
    type: "GET",
    dataType: "json",
    success: function(data) {
      $("#category_types").on("change", function(event) {
        let id = $(this).val();
        if (id !== "-1") {
          let selectedField = data.fields[id];

          let new_html = "";

          new_html += `<h2>${selectedField.field}</h2>`;

          // Checks if the description exist
          if (selectedField.description) {
            new_html += `<p>${selectedField.description}</p>`;
          }

          for (let i = 0; i < selectedField.categories.length; i++) {
            new_html += `<h3>${selectedField.categories[i].category_name} 
          </h3><ul>`;
            for (
              let j = 0;
              j < selectedField.categories[i].nominees.length;
              j++
            ) {
              if (selectedField.categories[i].winner_id == j) {
                new_html += `<li><strong class="winner"><img src="./img/star.png" alt="winner-star">${
                  selectedField.categories[i].nominees[j].nominee
                }</strong><img src="./img/star.png" alt="winner-star">`;
              } else {
                new_html += `<li><strong>${
                  selectedField.categories[i].nominees[j].nominee
                }</strong>`;
              }
              new_html += `
            <p>${selectedField.categories[i].nominees[j].artist}</p>
            <p>${selectedField.categories[i].nominees[j].info}</p>
            </li>`;
            }
            new_html += `</ul>`;
          }

          $("#nominees_section").html(new_html);
        }
      });
    },
    error: function(error_msg) {
      console.log(error_msg);
    }
  });
}
