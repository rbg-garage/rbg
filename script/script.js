const fs = require('fs');
const Piece = require('./pieceClass');
const Visitor = require('./visitorClass');

const rawData = fs.readFileSync('pieces.json');
const piecesData = JSON.parse(rawData);

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



