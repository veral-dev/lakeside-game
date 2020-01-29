class Background {
    constructor(ctx, w, h, posX, posY, imgSource) {

        this._ctx = ctx;
        this._width = w;
        this._height = h;

        this.image = new Image();
        this.image.src = imgSource;

        this.posX = posX;
        this.posY = posY;
    }

    draw() {
        this._ctx.drawImage(this.image, this.posX, this.posY, this._width, this._height);
    }


}