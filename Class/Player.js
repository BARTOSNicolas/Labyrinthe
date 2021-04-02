class Player{
    posX = 0;
    posY = 0;
    left = this.posX * 50 + 10;
    top = this.posY * 50 + 10;
    player;

    createPlayer(){
        this.player = document.createElement('div');
        this.player.setAttribute("id","player");
        this.player.style.width = "30px";
        this.player.style.height = "30px";
        this.player.style.backgroundColor = 'red';
        this.player.style.borderRadius = "50%";
        this.player.style.position = "absolute";
        this.player.style.left = this.left.toString() + "px";
        this.player.style.top = this.top.toString() + "px";
        document.getElementById('board').append(this.player)
    }
    movePlayer(moveX, moveY){
        this.posX = this.posX + moveX;
        this.posY = this.posY + moveY;
        this.left = this.posX * 50 + 10;
        this.top = this.posY * 50 + 10;
        this.player.style.left = this.left.toString() + "px";
        this.player.style.top = this.top.toString() + "px";
    }
}