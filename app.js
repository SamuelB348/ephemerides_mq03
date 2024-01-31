import Papa from 'papaparse';

function submitForm() {
  var selectedThemes = [];
  var checkboxes = document.getElementsByName("theme");

  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      selectedThemes.push(checkbox.value);
    }
  });

  Papa.parse("Indexation MQ03.csv", {
    download: true,
    header: true,
    complete: function (results) {
      var filteredData = results.data.filter(function (row) {
        return selectedThemes.some(function (theme) {
          return row[theme] === "1";
        });
      });

      var column1Values = filteredData.map(function (row) {
        return row["Colonne1"];
      });

      // Display the result on the webpage
      console.log(column1Values);
    },
  });
}
