const game = {
    name: 'Lakeside',
    author: "David Veral",
    license: undefined,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    windowsSize: {
        width: 1200,
        height: 600,
    },
    framesCounter: 0,
    keys: {
        RIGHT: 68,
        LEFT: 65,
        UP: 87,
        FIRE: 70,
    },
    backgroundArray: [],
    objectsArray: [],
    objectsInMovement: [],
    enemiesArray: [],

    init() {
        this.canvas = document.getElementById("Lakeside");
        this.ctx = this.canvas.getContext("2d");
        this.setDimensions();
        this.setWindowsMove();
        this.start();

    },
    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++

            if (this.framesCounter > 10000) this.framesCounter = 0;
            this.backgroundNight();
            this.clearScreen();
            this.drawAll();
            this.moveALl();
            this.isCollision();
            if (this.player.posY >= this.windowsSize.height) {
                this.gameOver()
            }

            // console.log(this.player.posY)
            // console.log(this.isCollision())
        }, 1000 / 20)
    },

    reset() {
        this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/sky.png'))
        this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/rocks.png'))
        this.objectsArray.push(new Object(this.ctx, 300, 50, this.windowsSize.width, this.windowsSize.height, 0, this.windowsSize.height - 60, 'images/pads/green-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 100, 30, this.windowsSize.width, this.windowsSize.height, 340, this.windowsSize.height - 80, 'images/pads/rock-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 300, 35, this.windowsSize.width, this.windowsSize.height, 500, this.windowsSize.height - 80, 'images/pads/rock-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 100, 30, this.windowsSize.width, this.windowsSize.height, 850, this.windowsSize.height - 80, 'images/pads/rock-floor.png'))

        this.objectsInMovement.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 1050, this.windowsSize.height - 80, 'images/pads/tree-floor.png', this.windowsSize.height - 80))

        this.player = new Player(this.ctx, this.windowsSize.width, this.windowsSize.height, this.keys)

        this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 760, this.windowsSize.height - 120, 760, this.windowsSize.height - 120, 'images/enemies/enemy1-final.png'))
    },
    drawAll() {
        this.backgroundArray.forEach(obs => obs.draw())
        this.objectsArray.forEach(obs => obs.draw())
        this.objectsInMovement.forEach(obs => obs.draw())
        this.enemiesArray.forEach(obs => obs.draw(this.framesCounter))
        this.player.draw(this.framesCounter);
    },
    moveALl() {
        // this.backgroundArray.forEach(obs => obs.move())
        this.player.move();
        this.objectsInMovement.forEach(obs => obs.move())
        this.enemiesArray.forEach(obs => obs.move())




    },
    backgroundNight() {
        if (this.framesCounter % 1000 === 0) {
            this.backgroundArray = []
            this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/sky-night.png'))
            this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/rocks.png'))
        }
    },

    setDimensions() {
        this.canvas.width = this.windowsSize.width
        this.canvas.height = this.windowsSize.height
    },
    setWindowsMove() {
        window.onresize = () => this.setDimensions()
    },
    clearScreen() {
        this.ctx.clearRect(0, 0, this.windowsSize.width, this.windowsSize.height)
    },

    gameOver() {
        alert('GAME OVER')
        clearInterval(this.interval);
    },
    isCollision() {


        this.objectsArray.forEach((obs) => {
            if (this.player.posX + this.player.width - 10 >= obs.posX &&
                // this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.player.posY0 = obs.posY - this.player.height
            } else {
                this.player.posY0 += 5
            }
        })
        this.objectsInMovement.forEach((obs) => {
            if (this.player.posX + this.player.width - 10 >= obs.posX &&
                // this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.player.posY0 = obs.posY - this.player.height
            } else {
                this.player.posY0 += 5
            }
        })
        //fin del juego, detenemos intervalo
    },


}