class Enemy {
    constructor(ctx, windowWidth, windowHeight, posX, posY, posX0, posY0, imgSource, enemyMove, shoot) {
        this._ctx = ctx
        this.gameWidth = windowWidth
        this.gameHeight = windowHeight
        this.image = new Image()
        this.image.src = imgSource
        this._shoot = shoot

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
        this.enemyLife = 40;
        this.bulletsEnemy = []
        this.bulletDirection = false
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
        this.bulletsEnemy.forEach(bullet => bullet.draw())
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.image.framesIndex > 2) {
                this.image.framesIndex = 0;
            }
        }
        if (this._shoot === 'shoot' && framesCounter % 40 == 0 && game.player.posY < this.posY + this.height) {
            this.shoot()
        }
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
        this.bulletsEnemy.forEach(bullet => bullet.move())
    }

    shoot() {
        game.player.posX >= this.posX ? this.bulletDirection = true : this.bulletDirection = false

        this.bulletsEnemy.push(new BulletEnemy(this._ctx, this.posX, this.posY + this.height / 2, this.posY0, this.height, this.bulletDirection));
        this.bulletsEnemy.length === 30 ? this.bulletsEnemy = [] : null
    }
}