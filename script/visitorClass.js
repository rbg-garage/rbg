export class Visitor {
    constructor(listPieces) {
        this.listPieces = listPieces;
    }

    rechercheMot(terme) {
        const termeLower = terme.toLowerCase();
        return this.listPieces.filter(piece => piece.libelle.toLowerCase().includes(termeLower));
    }

    rechercheDescr(terme) {
        const termeLower = terme.toLowerCase();
        return this.listPieces.filter(piece => piece.description.toLowerCase().includes(termeLower));
    }

    triPlusRecents(liste) {
        return [...liste].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    }

    triPlusAnciens(liste) {
        return [...liste].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    }

    triPrixCroissant(liste) {
        return [...liste].sort((a, b) => a.prix - b.prix);
    }

    triPrixDecroissant(liste) {
        return [...liste].sort((a, b) => b.prix - a.prix);
    }

    filtreMarque(marque) {
        const marqueLower = marque.toLowerCase();
        return this.listPieces.filter(piece => piece.marque.toLowerCase() === marqueLower);
    }

    filtreCategorie(categorie) {
        const categorieLower = categorie.toLowerCase();
        return this.listPieces.filter(piece => piece.categorie.toLowerCase() === categorieLower);
    }

    filtreEtat(etat) {
        const etatLower = etat.toLowerCase();
        return this.listPieces.filter(piece => piece.etat.toLowerCase() === etatLower);
    }

    filtrePrix(px1, px2) {
        return this.listPieces.filter(piece => piece.prix > px1 && piece.prix < px2);
    }

    filtreDisponibilite(disponibilite) {
        const disponibiliteLower = disponibilite.toString().toLowerCase();
        return this.listPieces.filter(piece => piece.disponibilite.toString().toLowerCase() === disponibiliteLower);
    }

    elementsCommuns(tableaux) {
        if (tableaux.length === 1 ) {
            return [];
        }
        return tableaux.reduce((acc, tableau) => acc.filter(element => tableau.includes(element)));
    }

    getObjectById(id) {
        return this.listPieces.find(piece => piece.id == id);
    }

    getMultipleObjectsById(arrayId) {
        return arrayId.map(id => this.getObjectById(id)).filter(object => object !== undefined);
    }

    getIdFromDiv(div) {
        const inputs = div.querySelectorAll('input[name="id"]');
        const values = Array.from(inputs).map(input => input.value);
        return values;
    }

    rechercheTriee(recherche, arrayCategorie, arrayMarque, arrayEtat, arrayDisponibilite) {
        var tableau = [];
        tableau.push(recherche);

        const arrayCategorieFiltre = recherche.filter(piece =>
            arrayCategorie.some(cat => piece.categorie.toLowerCase() === cat.toLowerCase())
        );

        if(arrayCategorie.length!==0){
            tableau.push(arrayCategorieFiltre);
        }

        console.log(arrayCategorieFiltre);

        const arrayMarqueFiltre = recherche.filter(piece =>
            arrayMarque.some(marque => piece.marque.toLowerCase() === marque.toLowerCase())
        );
        console.log(arrayMarqueFiltre);

        if(arrayMarque.length!==0){
            tableau.push(arrayMarqueFiltre);
        }


        const arrayEtatFiltre = recherche.filter(piece =>
            arrayEtat.some(etat => piece.etat.toLowerCase() === etat.toLowerCase())
        );

        console.log(arrayEtatFiltre);

        if(arrayEtat.length!==0){
            tableau.push(arrayEtatFiltre);
        }


        const arrayDisponibiliteFiltre = recherche.filter(piece =>
            arrayDisponibilite.some(dispo => piece.disponibilite.toString().toLowerCase() === dispo.toString().toLowerCase())
        );

        console.log(arrayDisponibiliteFiltre);

        if(arrayDisponibilite.length!==0){
            tableau.push(arrayDisponibiliteFiltre);
        }

        console.log(tableau);

        return this.elementsCommuns(tableau);
    }
}
