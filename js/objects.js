class Object {
    constructor(ctx, w, h, windowWidth, windowHeight, posX, posY, imgSource, posX0, posY0, distance, direction) {
        this._ctx = ctx;
        this.gameWidth = windowWidth;
        this.gameHeight = windowHeight;

        this._width = w;
        this._height = h;


        this.posX = posX
        this.posY = posY
        this.posY0 = posY0
        this.posX0 = posX0
        this._distance = distance
        this._direction = direction
        this.image = new Image();
        this.image.src = imgSource;

        this.vel = 3

    }

    draw() {
        this._ctx.drawImage(this.image, this.posX, this.posY, this._width, this._height);
    }

    move() {
        if (this._direction == 'horizontal') {
            this.posX -= this.vel
            if (this.posX >= this.posX0 - this._distance) {
                this.vel *= -1
            }
            if (this.posX <= this.posX0) {
                this.vel *= -1
            }
        } else if (this._direction == 'vertical') {
            this.posY -= this.vel
            if (this.posY <= this.posY0 - this._distance) {
                this.vel *= -1
            }
            if (this.posY >= this.posY0) {
                this.vel *= -1
            }
        }



    }
}