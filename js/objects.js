class Object {
    constructor(ctx, w, h, windowWidth, windowHeight, posX, posY, imgSource, playerY, playerH) {
        this._ctx = ctx;
        this.gameWidth = windowWidth;
        this.gameHeight = windowHeight;

        this._width = w;
        this._height = h;

        this.posX = posX;
        this.posY = posY
        //Usamos el playerY0+playerH para que aparezcan siempre en el suelo.

        this.image = new Image();
        this.image.src = imgSource;

    }

    draw() {
        this._ctx.drawImage(this.image, this.posX, this.posY, this._width, this._height);
        // this._ctx.drawImage(this.image, this.posX + this._width, this.posY, this._width, this._height);
    }

    // move() {
    //     this.posX -= this.velX
    // }
}