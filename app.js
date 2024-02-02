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
      
      resultContainer.innerHTML = "";
      
      if (column1Values.length === 0) {
        var noExerciseMessage = document.createElement("h2");
        noExerciseMessage.textContent = "Pas d'exercices disponibles pour cette combinaison !";
        resultContainer.appendChild(noExerciseMessage);

        // Ajouter une image centrée
        var img = document.createElement("img");
        img.src = "lien_de_votre_image.jpg"; // Remplacez ceci par le lien exact de votre image
        img.style.display = "block";
        img.style.margin = "auto";
        resultContainer.appendChild(img);
      } else {
        var heading = document.createElement("h2");
        heading.textContent = "Exercices disponibles";
        resultContainer.appendChild(heading);

        var infoParagraph = document.createElement("p");
        infoParagraph.textContent = "Format : Exercice <n°semaine>.<n°jour> avec jour n°6 = Weekend.";
        resultContainer.appendChild(infoParagraph);

        // Parcourez les valeurs et ajoutez-les à l'élément
        column1Values.forEach(function (value) {
          var paragraph = document.createElement("p");
          paragraph.textContent = "Exercice " + value;
          resultContainer.appendChild(paragraph);
        });
      }
    },
  });
}
