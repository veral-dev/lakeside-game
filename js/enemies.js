class Enemy {
    constructor(ctx, windowWidth, windowHeight, posX, posY, posX0, posY0, imgSource, enemyMove) {
        this._ctx = ctx
        this.gameWidth = windowWidth
        this.gameHeight = windowHeight
        this.image = new Image()
        this.image.src = imgSource

        this.width = 50
        this.height = 50

        this.posX = posX
        this.posX0 = posX0
        this.posY0 = posY0
        this.posY = posY
        this._move = enemyMove

        this.velY = 1
        this.vel = 1.5

        this.image.frames = 12; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
        this.image.framesY = 2;
        this.image.framesIndexY = 1;

        this.direction = false;
    }
    draw(framesCounter) {
        this._ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            this.image.framesIndexY * Math.floor(this.image.height / this.image.framesY), //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            Math.floor(this.image.height / this.image.framesY), //Punto y donde termina de recortar
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.animate(framesCounter)

        //  this.bullets.forEach(bullet => bullet.draw()); //El player dibuja las balas.
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.image.framesIndex > 2) {
                this.image.framesIndex = 0;
            }
        }
    }

    move() {

        this.posX -= this.vel
        if (this.posX <= this.posX0 - this._move) {
            this.direction = true
            this.image.framesIndexY = 0;

            this.vel *= -1
        }
        if (this.posX >= this.posX0) {
            this.direction = false
            this.image.framesIndexY = 1;

            this.vel *= -1
        }

    }
}