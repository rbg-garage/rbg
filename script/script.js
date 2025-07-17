import { Piece } from './pieceClass.js';
import { Visitor } from './visitorClass.js';

// Charger les données JSON depuis une URL
const jsonUrl = './data.json';
let visitor;

window.reservationDiv = reservationDiv;

function reservationDiv(divDetails) {
  // Ajoutez la classe "reservation" à la divDetails
  divDetails.classList.add("reservation");

  // Mettez à jour le titre
  var title = document.querySelector(".subtitle");
  if (title) {
    title.textContent = "Réservation";
  }

  // Clonez l'élément item-search-view
  var item = divDetails.querySelector(".item-search-view");
  if (!item) {
    console.error("Item not found");
    return;
  }

  var itemSearchView = item.cloneNode(true);

  // Supprimez l'élément original
  item.remove();

  // Récupérez l'ID de l'objet
  var idInput = itemSearchView.querySelector("input[name='id']");
  if (!idInput) {
    console.error("ID input not found");
    return;
  }

  var id = idInput.value;
  var objet = visitor.getObjectById(id);
  if (!objet) {
    console.error("Object not found with ID:", id);
    return;
  }

  // Créez le message de réservation
  var message = `Bonjour,

J'aimerai réserver la pièce n°${objet.id} - ${objet.libelle} et venir la chercher en magasin.

Merci et bonne journée
Cordialement,
[votre nom]`;

  // Créez la structure HTML pour le formulaire de réservation
  var divContentReservation = document.createElement("div");
  divContentReservation.classList.add("content-reservation");

  var hr = document.createElement("hr");

  var form = document.createElement("form");
  form.method = "POST";
  form.action = "https://formspree.io/f/mldldrog";


  var label1 = document.createElement("label");
  label1.textContent = "Email";
  label1.htmlFor = "email";

  var input1 = document.createElement("input");
  input1.name = "email";
  input1.type = "email";
  input1.required = true;

  var label2 = document.createElement("label");
  label2.textContent = "Message";
  label2.htmlFor = "message";

  var textArea = document.createElement("textarea");
  textArea.name = "message";
  textArea.value = message;
  textArea.cols="30";
  textArea.rows="10";
  textArea.required= true;

  var inputSubmit = document.createElement("input");
  inputSubmit.value = "Envoyer";
  inputSubmit.type = "submit";
  inputSubmit.classList.add("cta-1-dark");

  // Ajoutez les éléments créés à la structure
  form.appendChild(label1);
  form.appendChild(input1);
  form.appendChild(label2);
  form.appendChild(textArea);
  form.appendChild(inputSubmit);

  divContentReservation.appendChild(itemSearchView);
  divContentReservation.appendChild(hr);
  divContentReservation.appendChild(form);

  // Ajoutez la nouvelle structure à divDetails
  divDetails.appendChild(divContentReservation);
}



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
      data.categorie,
      data.description,
      data.etat,
      data.prix,
      data.img,
      data.disponibilite,
      data.dateTime
    ));
    visitor = new Visitor(pieces);
    const conteneur = document.querySelector(".search-results");
    if (conteneur) {
      pieces.forEach(piece => {
        conteneur.appendChild(piece.construireDiv());
      });
    }
  })
  .catch(error => console.error('Erreur lors du chargement des données:', error));

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function getCheckedValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  console.log(Array.from(checkboxes).map(checkbox => checkbox.value));

  return Array.from(checkboxes).map(checkbox => checkbox.value);
}

function handleSearch() {
  const conteneur = document.querySelector(".search-results");
  const searchContent = document.getElementById("search-content");
  const nameSearch = document.querySelector(".search-name");

  if (!conteneur || !searchContent || !nameSearch) return;

  if (searchContent.value !== "") {
    let array = visitor.rechercheMot(searchContent.value);
    if (array === null || array.length === 0) {
      array = visitor.rechercheDescr(searchContent.value);
    }

    if (array !== null && array.length > 0) {
      removeAllChildNodes(conteneur);
      array.forEach(element => {
        if (element) {
          conteneur.appendChild(element.construireDiv());
        }
      });
    } else {
      removeAllChildNodes(conteneur);
      alert("Pas de résultats !");
      conteneur.innerHTML += "<h2 class='subtitle'>Aucun résultat.</h2>";
    }
    nameSearch.textContent = searchContent.value;
  } else {
    nameSearch.textContent = "Tout";
    const array = visitor.listPieces;
    removeAllChildNodes(conteneur);
    array.forEach(element => {
      if (element) {
        conteneur.appendChild(element.construireDiv());
      }
    });
  }
}

function handleFilterSearch() {
  const conteneur = document.querySelector(".search-results");
  if (!conteneur) return;

  const valuesCategorie = getCheckedValues("category");
  const valuesMarque = getCheckedValues("marque");
  const valuesEtat = getCheckedValues("etat");
  const valuesDisponibilite = getCheckedValues("disponibilite");

  const idArray = visitor.getIdFromDiv(conteneur);
  
  const objectsArray = visitor.getMultipleObjectsById(idArray);
  
  const arrayFinal = visitor.rechercheTriee(objectsArray, valuesCategorie, valuesMarque, valuesEtat, valuesDisponibilite);
  console.log(arrayFinal);

  removeAllChildNodes(conteneur);
  arrayFinal.forEach(element => {
    if (element) {
      conteneur.appendChild(element.construireDiv());
    }
  });

  const popupFilter = document.querySelector(".popup-filter");
  if (popupFilter) {
    popupFilter.style.display = "none";
  }
}

function handleOrderByChange() {
  const conteneur = document.querySelector(".search-results");
  if (!conteneur) return;

  const idArray = visitor.getIdFromDiv(conteneur);
  const objectsArray = visitor.getMultipleObjectsById(idArray);
  let arrayFinal = [];

  switch (orderByBtn.value) {
    case "croissant":
      arrayFinal = visitor.triPrixCroissant(objectsArray);
      break;
    case "decroissant":
      arrayFinal = visitor.triPrixDecroissant(objectsArray);
      break;
    case "recent":
      arrayFinal = visitor.triPlusRecents(objectsArray);
      break;
    case "ancien":
      arrayFinal = visitor.triPlusAnciens(objectsArray);
      break;
    default:
      arrayFinal = objectsArray;
  }

  removeAllChildNodes(conteneur);
  arrayFinal.forEach(element => {
    if (element) {
      conteneur.appendChild(element.construireDiv());
    }
  });
}



// Ajout des écouteurs d'événements
const searchButton = document.getElementById("search-action");
const filterSearchAction = document.querySelector(".filter-search-action");
const orderByBtn = document.querySelector(".orderby");

if (searchButton) {
  searchButton.addEventListener("click", handleSearch);
}

if (filterSearchAction) {
  filterSearchAction.addEventListener("click", handleFilterSearch);
}

if (orderByBtn) {
  orderByBtn.addEventListener("change", handleOrderByChange);
}
