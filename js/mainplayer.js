class Player {
    constructor(ctx, windowWidth, windowHeight, keys) {
        this._ctx = ctx
        this.gameWidth = windowWidth
        this.gameHeight = windowHeight

        this.image = new Image()
        this.image.src = "images/mainplayer/final-player2.png"

        this.width = 50
        this.height = 50

        this.posX = 20
        this.posY0 = this.gameHeight - 150
        this.posY = this.gameHeight - this.height

        this.velY = 1

        this.image.frames = 12 //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
        this.image.framesY = 4
        this.image.framesIndexY = 0

        this.keys = keys
        this.keyRight = false
        this.keyUp = false
        this.keyLeft = false
        this.keyFire = false

        this.moving = false
        this.shooting = false

        this.bullets = []
        this.bulletDirection = false

        this.setListeners()

        this.playerLife = 3 // Vidas del jugador

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

        this.moving ? this.animate(framesCounter) : null; //Funcion que anima los frames
        this.shooting ? this.animate(framesCounter) : null;
        this.bullets.forEach(bullet => bullet.draw());
    }

    move() {
        let gravity = 0.8;
        if (this.posY < this.posY0) {
            //Comprobamos que el player nunca sobrepase el suelo.
            this.posY += this.velY;
            this.velY += gravity;
        } else {
            //Si lo hace reseteamos posición y velocidad
            this.velY = 1;
            this.posY = this.posY0;
        }
        this.moveJump()

        this.bullets.forEach(bullet => bullet.move()); //Movemos las balas
    }
    moveJump() {

        this.keyUp ? this.posY -= 10 : null

        this.keyRight ? this.posX += 5 : null

        this.keyLeft ? this.posX -= 5 : null
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            this.image.framesIndex > 2 ? this.image.framesIndex = 0 : null
        }
    }

    setListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {
                case this.keys.RIGHT:
                    this.image.framesIndexY = 0
                    this.moving = true;
                    this.keyRight = true;
                    this.bulletDirection = false;
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
                    this.keyFire = true
                    this.shooting = true
                    if (this.keyRight) {
                        this.image.framesIndexY = 2
                    } else if (this.keyLeft) {
                        this.image.framesIndexY = 3
                    }
                    break;
            }
        };

        document.onkeyup = e => {
            switch (e.keyCode) {
                case this.keys.RIGHT:
                    this.moving = false;
                    this.keyRight = false
                    break;

                case this.keys.LEFT:
                    this.keyLeft = false
                    this.moving = false;
                    break;

                case this.keys.UP:
                    this.keyUp = false;
                    this.velY = 1
                    break;

                case this.keys.FIRE:
                    this.shoot();
                    this.shooting = false
                    this.keyFire = false
            }
        };
    }

    shoot() {
        this.bullets.push(new Bullet(this._ctx, this.posX + this.width / 2, this.posY + this.height / 2, this.posY0, this.height, this.bulletDirection));
        this.bullets.length === 30 ? this.bullets = [] : null
    }

}