const game = {
    name: 'Lakeside',
    author: "David Veral",
    license: undefined,
    version: '1.0',
    canvas: undefined,
    ctx: undefined,
    windowsSize: {
        width: 1200,
        height: 650,
    },
    framesCounter: 0,
    keys: {
        RIGHT: 68,
        LEFT: 65,
        UP: 87,
        FIRE: 70,
    },
    gameMusic: new Sound("sounds/fallen-game-sound.mp3"),
    backgroundArray: [],
    objectsArray: [],
    objectsInMovementY: [],
    objectsInMovementX: [],
    enemiesArray: [],
    playerLife: 3,
    lifeArray: [],
    newLife: [],
    finish: '',

    init() {
        this.canvas = document.getElementById("Lakeside");
        this.ctx = this.canvas.getContext("2d");
        this.setDimensions();
        this.setWindowsMove();
        this.start();
        this.resetButton()
        this.audioButton()



    },
    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.framesCounter++

            if (this.framesCounter > 10000) this.framesCounter = 0
            // this.backgroundNight()

            this.clearScreen()
            this.drawAll()
            this.moveALl()
            this.isCollision()
            this.enemiesCollision()
            this.bulletCollision()
            this.player.posY >= this.windowsSize.height ? this.gameOver() : null
            this.scoreLife()
            this.win()


        }, 1000 / 20)
    },

    reset() {
        this.backgroundArray = []
        this.objectsArray = []
        this.objectsInMovementX = []
        this.objectsInMovementY = []
        this.enemiesArray = []
        this.lifeArray = []
        this.newLife = []

        this.gameMusic.play()

        this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 0, 0, 'images/background/sky-night.png'))
        this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 0, 0, 'images/background/rocks.png'))
        this.backgroundArray.push(new Background(this.ctx, 510, 104, this.windowsSize.width / 2 - 255, 20, 'images/game-logo.png'))

        this.objectsArray.push(new Object(this.ctx, 300, 50, this.windowsSize.width, this.windowsSize.height, 0, this.windowsSize.height - 60, 'images/pads/green-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 100, 30, this.windowsSize.width, this.windowsSize.height, 340, this.windowsSize.height - 80, 'images/pads/rock-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 300, 35, this.windowsSize.width, this.windowsSize.height, 500, this.windowsSize.height - 80, 'images/pads/rock-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 100, 30, this.windowsSize.width, this.windowsSize.height, 890, this.windowsSize.height - 80, 'images/pads/rock-floor.png'))
        // this.objectsArray.push(new Object(this.ctx, 50, 35, this.windowsSize.width, this.windowsSize.height, 1065, this.windowsSize.height - 60, 'images/pads/flight-up.png'))

        this.objectsInMovementY.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 1050, this.windowsSize.height - 80, 'images/pads/tree-floor.png', 1050, this.windowsSize.height - 80, 110))

        // Second floor
        this.objectsArray.push(new Object(this.ctx, 500, 40, this.windowsSize.width, this.windowsSize.height, 500, this.windowsSize.height - 200, 'images/pads/sand-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 200, 30, this.windowsSize.width, this.windowsSize.height, 10, this.windowsSize.height - 200, 'images/pads/sand-floor.png'))
        this.objectsInMovementX.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 380, this.windowsSize.height - 200, 'images/pads/tree-floor.png', 380, this.windowsSize.height - 200, 140))

        // Third floor
        this.objectsArray.push(new Object(this.ctx, 40, 40, this.windowsSize.width, this.windowsSize.height, 10, this.windowsSize.height - 235, 'images/pads/rock.png'))
        this.objectsArray.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 50, this.windowsSize.height - 300, 'images/pads/sand-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 150, this.windowsSize.height - 290, 'images/pads/sand-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 260, 30, this.windowsSize.width, this.windowsSize.height, 250, this.windowsSize.height - 310, 'images/pads/sand-floor.png'))

        this.objectsArray.push(new Object(this.ctx, 60, 20, this.windowsSize.width, this.windowsSize.height, 570, this.windowsSize.height - 305, 'images/pads/rock-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 60, 20, this.windowsSize.width, this.windowsSize.height, 690, this.windowsSize.height - 305, 'images/pads/rock-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 60, 20, this.windowsSize.width, this.windowsSize.height, 810, this.windowsSize.height - 305, 'images/pads/rock-floor.png'))

        this.objectsInMovementX.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 970, this.windowsSize.height - 300, 'images/pads/tree-floor.png', 970, this.windowsSize.height - 300, 60))
        this.objectsInMovementY.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 1100, this.windowsSize.height - 300, 'images/pads/tree-floor.png', 1100, this.windowsSize.height - 300, 80))

        // Final
        this.objectsInMovementX.push(new Object(this.ctx, 80, 20, this.windowsSize.width, this.windowsSize.height, 970, this.windowsSize.height - 410, 'images/pads/tree-floor.png', 990, this.windowsSize.height - 410, 80))
        this.objectsArray.push(new Object(this.ctx, 300, 35, this.windowsSize.width, this.windowsSize.height, 550, this.windowsSize.height - 420, 'images/pads/sand-floor.png'))
        this.objectsArray.push(new Object(this.ctx, 300, 40, this.windowsSize.width, this.windowsSize.height, 250, this.windowsSize.height - 450, 'images/pads/sand-floor.png'))


        this.objectsArray.push(new Object(this.ctx, 200, 40, this.windowsSize.width, this.windowsSize.height, 40, 140, 'images/pads/sand-floor.png'))
        this.finish = new Object(this.ctx, 130, 130, this.windowsSize.width, this.windowsSize.height, 50, 30, 'images/pads/finish.png')

        // New life
        this.newLife.push(new Object(this.ctx, 40, 40, this.windowsSize.width, this.windowsSize.height, 700, this.windowsSize.height - 370, 'images/pads/new-life.png'))

        //Player
        this.player = new Player(this.ctx, this.windowsSize.width, this.windowsSize.height, this.keys, this.framesCounter)
        this.enemiesCreation()

    },
    drawAll() {
        this.backgroundArray.forEach(obs => obs.draw())
        this.lifeArray.forEach(obs => obs.draw())

        this.objectsArray.forEach(obs => obs.draw())
        this.objectsInMovementY.forEach(obs => obs.draw())
        this.objectsInMovementX.forEach(obs => obs.draw())
        this.newLife.forEach(obs => obs.draw())
        this.enemiesArray.forEach(obs => obs.draw(this.framesCounter))
        this.finish.draw()

        this.player.draw(this.framesCounter);

        // More Enemies
        if (this.framesCounter % 1000 === 0) {
            this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 300, this.windowsSize.height - 450, 460, this.windowsSize.height - 350, 'images/enemies/enemy1-final.png', 220))
            this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 350, this.windowsSize.height - 550, 500, this.windowsSize.height - 490, 'images/enemies/enemy2-final.png', 220))
        }


    },
    moveALl() {
        // this.backgroundArray.forEach(obs => obs.move())
        this.player.move(this.framesCounter);
        this.objectsInMovementY.forEach(obs => obs.moveY())
        this.objectsInMovementX.forEach(obs => obs.moveX())

        this.enemiesArray.forEach(obs => obs.move())

    },
    scoreLife() {
        if (this.playerLife >= 3) {
            this.lifeArray.push(new Object(this.ctx, 100, 100, this.windowsSize.width, this.windowsSize.height, this.windowsSize.width - 120, 20, 'images/pads/score03.png'))
        } else if (this.playerLife === 2) {
            this.lifeArray.push(new Object(this.ctx, 100, 100, this.windowsSize.width, this.windowsSize.height, this.windowsSize.width - 120, 20, 'images/pads/score02.png'))

        } else if (this.playerLife === 1) {
            this.lifeArray.push(new Object(this.ctx, 100, 100, this.windowsSize.width, this.windowsSize.height, this.windowsSize.width - 120, 20, 'images/pads/score01.png'))

        } else {
            this.gameOver()
        }

    },
    backgroundNight() {
        if (this.framesCounter % 500 === 0) {
            this.backgroundArray = []
            this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/sky-night.png'))
            this.backgroundArray.push(new Background(this.ctx, this.windowsSize.width, this.windowsSize.height, 'images/background/rocks.png'))
        }

    },
    enemiesCreation() {

        this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 760, this.windowsSize.height - 120, 760, this.windowsSize.height - 120, 'images/enemies/enemy1-final.png', 250))
        this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 940, this.windowsSize.height - 240, 940, this.windowsSize.height - 240, 'images/enemies/enemy1-final.png', 400))
        this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 550, this.windowsSize.height - 240, 940, this.windowsSize.height - 240, 'images/enemies/enemy1-final.png', 400))
        this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 390, this.windowsSize.height - 400, 460, this.windowsSize.height - 350, 'images/enemies/enemy1-final.png', 220))
        this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 800, this.windowsSize.height - 465, 800, this.windowsSize.height - 465, 'images/enemies/enemy1-final.png', 220))


        this.enemiesArray.push(new Enemy(this.ctx, this.windowsSize.width, this.windowsSize.height, 500, this.windowsSize.height - 490, 500, this.windowsSize.height - 490, 'images/enemies/enemy2-final.png', 220))


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


    isCollision() {

        // Objetos
        this.objectsArray.forEach((obs) => {

            if (this.player.posX + this.player.width - 10 >= obs.posX &&
                // this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.player.posY0 = obs.posY - this.player.height
            } else {
                this.player.posY0 += 1
            }
        })
        // Objetos en movimiento Y plataformas
        this.objectsInMovementY.forEach((obs) => {

            if (this.player.posX + this.player.width - 10 >= obs.posX &&
                // this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.player.posY0 = obs.posY - this.player.height
            } else {
                this.player.posY0 += 1
            }
        })
        // Objetos en movimiento X plataformas
        this.objectsInMovementX.forEach((obs) => {
            if (this.player.posX + this.player.width - 10 >= obs.posX &&
                this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.player.posY0 = obs.posY - this.player.height
                this.player.posX = obs.posX + 25
            } else {
                this.player.posX0 += 1
            }
        })
        // New Life
        this.newLife.forEach((obs) => {

            if (this.player.posX + this.player.width - 10 >= obs.posX &&
                this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.playerLife += 1;
                this.newLife = [];

            }
        })

    },

    enemiesCollision() {

        this.enemiesArray.forEach((enemy) => {
            if (this.player.posX + this.player.width - 20 >= enemy.posX &&
                this.player.posY - 10 + this.player.height >= enemy.posY &&
                this.player.posX <= enemy.posX + enemy.width - 15 &&
                this.player.posY + this.player.height <= enemy.posY + enemy.height + 20
            ) {
                if (this.player.posX <= enemy.posX) {
                    this.player.posX = enemy.posX - this.player.width;
                    this.playerLife--
                } else if (this.player.posX + this.player.width + enemy.width >= enemy.posX) {
                    this.player.posX = enemy.posX + this.player.width;
                    this.playerLife--
                }
            }

        })
    },

    bulletCollision() {
        //Bullets impact

        this.enemiesArray.forEach(
            (enemy, idx) => {
                this.player.bullets.forEach((bullet, idxBullet) => {
                    if (bullet.posX + bullet.radius >= enemy.posX &&
                        bullet.posY + bullet.radius >= enemy.posY &&
                        bullet.posX <= enemy.posX + enemy.width &&
                        bullet.posY + bullet.radius <= enemy.posY + enemy.height) {
                        enemy.enemyLife--
                        this.player.bullets.splice(idx, 1)
                        if (enemy.enemyLife <= 0) {
                            this.enemiesArray.splice(idx, 1)
                        }
                    }
                })

            });
    },
    win() {
        //WIN
        if (this.player.posX >= this.finish.posX &&
            this.player.posX <= this.finish.posX + this.finish._width - 100 &&
            this.player.posY + this.player.height <= this.finish.posY + this.finish._height
        ) {
            this.youWin()
            clearInterval(this.interval);
        }
    },

    youWin() {
        let myImage = new Image()
        myImage.src = 'images/game-win.png'
        myImage.onload = () => this.ctx.drawImage(myImage, this.windowsSize.width / 2 - 200, this.windowsSize.height / 2 - 200, 400, 400)
    },
    gameOver() {
        let myImage = new Image()
        myImage.src = 'images/game-over.png'
        myImage.onload = () => this.ctx.drawImage(myImage, this.windowsSize.width / 2 - 200, this.windowsSize.height / 2 - 200, 400, 400)
        clearInterval(this.interval);
    },

    audioButton() {
        document.getElementById("audio-button").onclick = function () {
            console.log(this.gameMusic)

            this.gameMusic._sound.paused == false ? this.gameMusic.stop() : this.gameMusic.play()
        }.bind(game);

    },

    resetButton() {
        document.getElementById("reset-button").onclick = function () {
            clearInterval(this.interval);
            this.clearScreen()
            this.reset()
            this.start()
            this.gameMusic._sound.currentTime = 0

            // this.gameMusic._sound.paused == false ? this.gameMusic.stop() : this.gameMusic.play()
        }.bind(game)
    }

}