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
    backgroundArray: [],


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
        }, 1000 / 40)
    },

    reset() {
        this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/sky.png'))
        this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/rocks.png'))
    },
    drawAll() {
        this.backgroundArray.forEach(obs => obs.draw())
    },
    moveALl() {
        this.backgroundArray.forEach(obs => obs.move())


    },
    backgroundNight() {
        if (this.framesCounter % 100 === 0) {
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
}