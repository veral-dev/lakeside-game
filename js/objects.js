class Object {
    constructor(ctx, w, h, windowWidth, windowHeight, posX, posY, imgSource, posX0, posY0, distance) {
        this._ctx = ctx;
        this.gameWidth = windowWidth;
        this.gameHeight = windowHeight;

        this._width = w;
        this._height = h;

        this.posX = posX
        this.posY = posY
        this.posY0 = posY0
        this.posX0 = posX0
        this.distance = distance

        this.image = new Image();
        this.image.src = imgSource;

        this.vel = 3

    }

    draw() {
        this._ctx.drawImage(this.image, this.posX, this.posY, this._width, this._height);
    }

    moveY() {
        this.posY -= this.vel
        if (this.posY <= this.posY0 - this.distance) {
            this.vel *= -1
        }
        if (this.posY >= this.posY0) {
            this.vel *= -1
        }

    }

    moveX() {
        this.posX -= this.vel
        if (this.posX >= this.posX0 - this.distance) {
            this.vel *= -1
        }
        if (this.posX <= this.posX0) {
            this.vel *= -1
        }
    }
}