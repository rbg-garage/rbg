export class Visitor{
    listPieces;

    constructor(listPieces){
        this.listPieces = listPieces;
    }


    rechercheMot(terme) {
        const listeTriee = this.listPieces.filter(piece => piece.libelle.includes(terme));
        return listeTriee;
    }
    

    rechercheDescr(terme){
        const listeTriee = this.listPieces.filter(piece => piece.description.includes(termes));
        return listeTriee;
    }

    triPlusRecents() {
        const listeTriee = this.listPieces.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
        return listeTriee;
    }

    triPlusAnciens() {
        const listeTriee = this.listPieces.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        return listeTriee;
    }

    triPrixCroissant() {
        const listeTriee = this.listPieces.sort((a, b) => a.prix - b.prix);
        return listeTriee;
    }

    triPrixDecroissant() {
        const listeTriee = this.listPieces.sort((a, b) => b.prix - a.prix);
        return listeTriee;
    }

    filtreMarque(marque){
        const listeTriee = this.listPieces.filter(piece => piece.marque === marque);
        return listeTriee;

    }

    filtreCategorie(categorie){
        const listeTriee = this.listPieces.filter(piece => piece.categorie === categorie);
        return listeTriee;

    }

    filtreEtat(etat){
        const listeTriee = this.listPieces.filter(piece => piece.etat === etat);
        return listeTriee;

    }

    filtrePrix(px1,px2){
        const listeTriee = this.listPieces.filter(piece => piece.prix > px1 && piece.prix < px2);
        return listeTriee;

    }
    
    filtreDisponibilite(disponibilite){
        const listeTriee = this.listPieces.filter(piece => piece.disponibilite === disponibilite);
        return listeTriee;

    }











    elementsCommuns(tableaux) {
    if (tableaux.length === 0) {
        return [];
    }

    return tableaux.reduce((acc, tableau) => {
        
        return acc.filter(element => tableau.includes(element));
    }, tableaux[0]);
}

}

