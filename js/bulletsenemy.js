class BulletEnemy {
    constructor(ctx, x, y, y0, playerH, direction) {
        this.ctx = ctx
        this.posX = x;
        this.posY = y;
        this.posY0 = y0
        this.playerHeight = playerH
        this.radius = 3;
        this.velX = 10;
        this.velY = 0;
        this._direction = direction

        this.gravity = 0;
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "#00ffe9";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {

        if (this._direction) {
            this.posX += this.velX
        } else {
            this.posX -= this.velX
        }
    }
}