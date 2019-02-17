$(document).ready(function() {
  $("select").formSelect();
  loadNominees();
});

/**
 * Fetch categories to display in select with id="category_types
 * @param {json} grammys.json JSON with data of grammys 2019
 */
fetch("./data/grammys.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    let new_html = "";

    for (let i = 0; i < data.fields.length; i++) {
      new_html += `
            <option value="${data.fields[i].field_id - 1}">
              ${data.fields[i].field}
            </option>
          `;
    }

    $("#category_types").append(new_html);
    return;
  })
  .catch(function(err) {
    console.log("Fetch Error :-S", err);
  });

/**
 * Fetch data to display in section id="nominees_section" of selected category
 * @param {json} grammys.json JSON with data of grammys 2019
 */
function loadNominees() {
  fetch("./data/grammys.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
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
      return;
    })
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });

  return;
}
