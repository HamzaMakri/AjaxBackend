
let getFetchOptions = { method: 'GET' }
let deleteFetchOptions = { method: 'DELETE' }

const url = "http://localhost:8989/api"

// Va s'executer au chargement de la page
document.addEventListener("DOMContentLoaded", loadCountries);

// Fonction chargeant les pays dans la liste déroulante
function loadCountries(){
  event.preventDefault();
  fetch(url + "/countries", getFetchOptions)
      .then((response) => {
          return response.json()
      })
      .then((dataJSON) => {

          let resultJson = dataJSON._embedded;
          // Le code source du template est dans la page
          var template = document.getElementById("countriesTemplate").innerHTML;
          // On combine le template avec le résultat de la requête
          var generatedHtml = Mustache.render(template, resultJson);
          // On affiche le résultat dans la page
          document.getElementById("selectContainer").innerHTML = generatedHtml;
      })
      .catch((error) => console.log(error))
}

// fonction triggered quand un pays est selectionné dans la liste déroulante qui
// va afficher le tableau des villes du pays selectionné
function countrySelected(){
  let urlCities = document.getElementById('countrySelector').value
  fetch(urlCities, getFetchOptions)
      .then((response) => {
          return response.json()
      })
      .then((dataJSON) => {
          console.log(dataJSON)

          let resultJson = dataJSON._embedded;
          // Le code source du template est dans la page
          var template = document.getElementById("citiesTemplate").innerHTML;
          // On combine le template avec le résultat de la requête
          var generatedHtml = Mustache.render(template, resultJson);

          // On affiche le résultat dans la page
          document.getElementById("tableContainer").innerHTML = generatedHtml;
      })
      .catch((error) => console.log(error))
}

// Fonction supprimant le ville choisie
function deleteCity(urlDeleted) {
  console.log(urlDeleted)
  fetch(urlDeleted, deleteFetchOptions)
      .then((response) => {
          countrySelected()
      })
      .catch((error) => console.log(error))
}
