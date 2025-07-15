import { Piece } from './pieceClass.js';
import { Visitor } from './visitorClass.js';

// Charger les données JSON depuis une URL
const jsonUrl = './data.json';
var visitor = "";

fetch(jsonUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(piecesData => {
    const pieces = piecesData.map(data => new Piece(
      data.id,
      data.libelle,
      data.marque,
      data.description,
      data.etat,
      data.prix,
      data.img,
      data.disponibilite,
      data.dateTime
    ));

    visitor = new Visitor(pieces);
    var conteneur = document.querySelector(".search-results");
    pieces.forEach(piece => {
      conteneur.appendChild(piece.construireDiv());
    });
  })
  .catch(error => console.error('Erreur lors du chargement des données:', error));

    
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
  var conteneur = document.querySelector(".search-results");
  var searchContent = document.getElementById("search-content");
  var searchButton = document.getElementById("search-action");

  searchButton.addEventListener("click",()=>{
    if(searchContent.value!==""){
      if(visitor.rechercheMot(searchContent.value)!== null){
        var array = visitor.rechercheMot(searchContent.value);
        removeAllChildNodes(conteneur);
        array.forEach(element => {
          conteneur.appendChild(element.construireDiv());
        });

      }else if(visitor.rechercheDescr(searchContent.value)!==null){
         var array = visitor.rechercheDescr(searchContent.value);
          removeAllChildNodes(conteneur);
          array.forEach(element => {
          conteneur.appendChild(element.construireDiv());
        });
      }else{
        removeAllChildNodes(conteneur);
        alert("Pas de résultats ! ");
        conteneur.innerHTML += "<h2 class='subtitle'>Aucun résultat.</h2>";
      }
    }else{
      array = visitor.lis
      array.forEach(element => {
          conteneur.appendChild(element.construireDiv());
      });
    }
  });
