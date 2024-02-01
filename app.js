function submitForm() {
  var selectedThemes = [];
  var checkboxes = document.getElementsByName("theme");

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedThemes.push(checkbox.value);
    }
  });
  console.log("Selected Themes:", selectedThemes);
  
  Papa.parse("Indexation MQ03.csv", {
    download: true,
    header: true,
    complete: function (results) {
      var filteredData = results.data.filter(function (row) {
        // Check if all selected themes have a value of 1 in the current row
        return selectedThemes.every(function (theme) {
          return row[theme] === "1";
        });
      });
      var column1Values = filteredData.map(function (row) {
        return row["Colonne1"];
      });

      // Display the result on the webpage
      console.log("Column1 Values:", column1Values);

      var resultContainer = document.getElementById("result-container");

// Effacez le contenu existant de l'élément (au cas où vous exécutez cette fonction plusieurs fois)
      resultContainer.innerHTML = "";
      
      // Parcourez les valeurs et ajoutez-les à l'élément
      column1Values.forEach(function (value) {
        var paragraph = document.createElement("p");
        paragraph.textContent = value;
        resultContainer.appendChild(paragraph);
      });
    },
  });
}
