class Case {
    color = '#59343B';
    tailleCase = "50px";
    carre = document.createElement('div');
    visited = false;
    parent;
    neighbours = [];
    constructor(objet, taille) {
        this.posX = objet.posX;
        this.posY = objet.posY;
        this.wallUp = objet.walls[0];
        this.wallRight = objet.walls[1];
        this.wallDown = objet.walls[2];
        this.wallLeft = objet.walls[3];
        this.taille = taille;
    }
    createCase() {
        this.carre.style.width = this.tailleCase;
        this.carre.style.height = this.tailleCase;
        this.carre.style.backgroundColor = '#D9D0C7';
        if (this.wallUp) {
            this.carre.style.borderTop = 'solid 2px' + this.color;
        }
        if (this.wallRight) {
            this.carre.style.borderRight = 'solid 2px' + this.color;
        }
        if (this.wallDown) {
            this.carre.style.borderBottom = 'solid 2px' + this.color;
        }
        if (this.wallLeft) {
            this.carre.style.borderLeft = 'solid 2px' + this.color;
        }
        return this.carre;
    }
    setBGColor(color){
        this.carre.style.backgroundColor = color;
    }
    setVisited(){
        this.visited = true;
        // this.carre.style.backgroundColor = "green";
    }
    checkNeighbours(laby){
        if (!this.wallUp) {
            this.neighbours.push(laby[this.posX -1][this.posY])
        }
        if (!this.wallRight) {
            this.neighbours.push(laby[this.posX][this.posY +1])
        }
        if (!this.wallDown) {
            this.neighbours.push(laby[this.posX +1][this.posY])
        }
        if (!this.wallLeft) {
            this.neighbours.push(laby[this.posX][this.posY -1])
        }
    }
}
class Start extends Case{
    start = true;
    constructor(objet, taille) {
        super(objet, taille);
    }
    createCase() {
        super.createCase();
        this.carre.style.backgroundColor = '#F5F5DC';
        return this.carre
    }
}

class End extends Case{
    end = true;
    constructor(objet, taille) {
        super(objet, taille);
    }
    createCase() {
        super.createCase();
        this.carre.style.backgroundColor = '#FFE4E1';
        return this.carre
    }
}