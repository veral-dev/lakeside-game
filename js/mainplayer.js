class Player {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;

        this.image = new Image();
        this.image.src = "images/mainplayer/player-run.png";

        this.width = 50;
        this.height = 50;

        this.posX = 40;
        this.posY0 = this.gameHeight * 0.95 - this.height; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.95 - this.height;

        this.velY = 1;

        this.image.frames = 12; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

        this.keys = keys;

        this.bullets = [];

        this.moving = false

        this.setListeners(); //Llamamos al listener para que desde el primer momento el jugador responda.
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            this.image.height, //Punto y donde termina de recortar
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

        this.bullets.forEach(bullet => bullet.move()); //Movemos las balas
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
                    this.posX += 5;
                    break;
                case this.keys.LEFT:
                    this.moving = true;
                    this.posX -= 5;
                    break;

                case this.keys.UP:
                    if (this.posY >= this.posY0) {
                        //COmprobamos que el player este en el suelo antes de saltar
                        this.posY -= 20; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
                        this.velY -= 10;
                    }
                    break;
                case this.keys.RIGHT && this.keys.UP:
                    this.moving = false;
                    this.posX += 5;
                    this.posY -= 15;
                    break;
                case this.keys.FIRE:
                    this.shoot(); //Funcion de disparo
                    break;
            }
        };
        document.onkeyup = e => {
            switch (e.keyCode) {
                case this.keys.RIGHT:
                    this.moving = false;
                    break;

            }
        };
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.posX + this.width + 15, this.posY + this.height / 2, this.posY0, this.height));
        this.bullets.length === 15 ? this.bullets = [] : null
    }
}