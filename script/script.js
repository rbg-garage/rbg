import { Piece } from './pieceClass.js';
import { Visitor } from './visitorClass.js';

// Charger les données JSON depuis une URL
const jsonUrl = './data.json';

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

    var visitor = new Visitor(pieces);
    var conteneur = document.querySelector(".search-results");
    pieces.forEach(piece => {
      conteneur.appendChild(piece.construireDiv());
    });
  })
  .catch(error => console.error('Erreur lors du chargement des données:', error));
