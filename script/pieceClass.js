export class Piece {
  id;
  libelle;
  marque;
  categorie;
  description;
  etat;
  prix;
  img;
  disponibilite;
  dateTime;
  div;

  constructor(id, libelle, marque, description, etat, prix, img, disponibilite, dateTime) {
    this.id = id;
    this.libelle = libelle;
    this.marque = marque;
    this.description = description;
    this.etat = etat;
    this.prix = prix;
    this.img = img;
    this.disponibilite = disponibilite;
    this.dateTime = dateTime;
    this.div = null; // Initialize as null, not a string
  }

  // Getters and setters remain the same

  construireDiv() {
    if (this.disponibilite === true) {
      this.div = document.createElement('div');
      this.div.className = "item-search-view";
      this.div.innerHTML = `
        <div class="img"></div>
        <div class="text-item">
          <div class="title-item">
            <h3>${this.libelle}</h3>
            <span>${this.marque}</span>
          </div>
          <span class="category">Catégorie : ${this.categorie}</span>
          <span class="description">${this.description}</span>
          <div class="state-price-item">
            <span class="state">${this.etat}</span>
            <h3>${this.prix} &euro;</h3>
          </div>
          <input type="hidden" value="${this.id}" name="id">
          <input type="hidden" value="${this.dateTime}" name="id">
          <div class="cta-1-dark">Réserver</div>
        </div>
      `;
    } else {
      this.div = document.createElement('div');
      this.div.className = "item-search-view indisponible";
      this.div.innerHTML = `
        <div class="img"></div>
        <div class="text-item">
          <div class="title-item">
            <h3>Pneus</h3>
            <span>Citroën</span>
          </div>
          <span class="category">Catégorie : Carosserie</span>
          <span class="description hidden">${this.description}</span>
          <div class="state-price-item">
            <span class="state">Bon état</span>
            <h3>17,00 &euro;</h3>
          </div>
          <input type="hidden" value="${this.id}" name="id">
          <input type="hidden" value="${this.dateTime}" name="datetime">
          <div class="cta-1-dark">Réserver</div>
        </div>
      `;
    }
    this.slidesRound();
    return this.div;
  }

  slidesRound() {

    let currentIndex = 0;
    const buttons = [];
    const imgDiv = this.div.querySelector('.img');

    this.img.forEach((_, index) => {
      let btn = document.createElement('button');
      btn.className = 'point mx-2 my-4 bg-white h-4 w-4 rounded-2xl';
      btn.addEventListener('click', () => {
        buttons.forEach(button => button.classList.remove('highlight'));
        btn.classList.add('highlight');
        currentIndex = index;
        imgDiv.style.backgroundImage = `url('src/img/img/${this.img[currentIndex]}')`;
      });
      imgDiv.appendChild(btn);
      buttons.push(btn);
    });

    imgDiv.style.backgroundImage = `url('src/img/img/${this.img[0]}')`;

    if (buttons.length > 0) {
      buttons[0].classList.add('highlight');
    }

    setInterval(() => {
      currentIndex = (currentIndex + 1) % this.img.length;
      imgDiv.style.backgroundImage = `url('src/img/img/${this.img[currentIndex]}')`;
      buttons.forEach((button, index) => {
        button.classList.toggle('highlight', index === currentIndex);
      });
    }, 3000);
  }
}

