class Labyrinthe {
    tab = [];
    constructor(data, taille, exemple) {
        this.exemple = data[taille.toString()]['ex-' + exemple.toString()];
        this.taille = taille;
    }

    createLab() {
        let board = document.createElement('div');
        board.setAttribute('id', 'board');
        board.style.width = (this.taille * 50) + 'px';
        board.style.height = (this.taille * 50) + 'px';

        //Créé les cases
        for (let elem of this.exemple) {
            let carre;
            if(elem.posX == 0 && elem.posY == 0){
                carre = new Start(elem, this.taille);
            }else if(elem.posX === this.taille -1 && elem.posY === this.taille -1){
                carre = new End(elem, this.taille);
            }else{
                carre = new Case(elem, this.taille);
            }

            //Rempli un tableau en 2D
            if(this.tab[carre.posX]  === undefined){
                this.tab.push([])
            }
            this.tab[carre.posX].push(carre)

            //Ajoute la Case au Labyrinthe
            board.append(carre.createCase());
        }

        document.querySelector('#showLaby').append(board);
    }
}

