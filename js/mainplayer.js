class Player {
    constructor(ctx, windowWidth, windowHeight, keys) {
        this._ctx = ctx;
        this.gameWidth = windowWidth;
        this.gameHeight = windowHeight;

        this.image = new Image();
        this.image.src = "images/mainplayer/final-player2.png";

        this.width = 50;
        this.height = 50;

        this.posX = 0;
        this.posY0 = this.gameHeight * 0.95 - this.height; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.95 - this.height;

        this.velY = 1;

        this.image.frames = 12; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
        this.image.framesY = 4;
        this.image.framesIndexY = 0

        this.keys = keys;


        this.bullets = [];

        this.moving = false
        this.keyRight = false
        this.keyUp = false
        this.keyLeft = false
        this.keyFire = false
        this.bulletDirection = false

        this.setListeners();
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
        this.moving ? this.animate(framesCounter) : null; //Funcion que anima los frames.

        this.bullets.forEach(bullet => bullet.draw()); //El player dibuja las balas.
    }

    move() {
        let gravity = 0.8;

        if (this.posY < this.posY0) {
            //COmprobamos que el player nunca sobrepase el suelo.

            this.posY += this.velY;
            this.velY += gravity;
        } else {
            //Si lo hace reseteamos posición y velocidad
            this.velY = 1;
            this.posY = this.posY0;
        }
        this.moveJump()

        //mueve derecha
        // this.posX += 5;
        // this.posY -= 20; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él

        this.bullets.forEach(bullet => bullet.move()); //Movemos las balas
    }
    moveJump() {
        if (this.keyUp) {
            this.posY -= 10;
        }
        this.keyRight ? this.posX += 5 : null

        this.keyLeft ? this.posX -= 5 : null

        this.keyLeft && this.keyFire ? this.image.framesIndexY = 3 : null

    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.image.framesIndex > 2) {
                this.image.framesIndex = 0;
            }
        }
    }

    setListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {
                case this.keys.RIGHT:
                    this.moving = true;
                    this.keyRight = true;

                    break;
                case this.keys.LEFT:
                    this.moving = true;
                    this.keyLeft = true;
                    this.bulletDirection = true;
                    this.image.framesIndexY = 1;

                    break;

                case this.keys.UP:
                    if (this.posY >= this.posY0) {
                        this.keyUp = true
                        this.velY -= 10;


                    }
                    break;

                case this.keys.FIRE:
                    this.image.framesIndexY = 2
                    this.keyFire = true
                    this.shoot(); //Funcion de disparo
                    break;
            }
        };

        document.onkeyup = e => {
            switch (e.keyCode) {
                case this.keys.RIGHT:
                    this.moving = false;
                    this.keyRight = false;

                    break;
                case this.keys.LEFT:
                    this.moving = false;
                    this.keyLeft = false;
                    this.bulletDirection = false;
                    this.image.framesIndexY = 0

                    break;
                case this.keys.UP:
                    this.keyUp = false;

                    this.velY = 1

                    break;
                case this.keys.FIRE:
                    this.image.framesIndexY = 0
                    this.keyFire = false

            }
        };
    }

    shoot() {
        this.bullets.push(new Bullet(this._ctx, this.posX + this.width, this.posY + this.height / 2, this.posY0, this.height, this.bulletDirection));
        this.bullets.length === 15 ? this.bullets = [] : null
    }

}