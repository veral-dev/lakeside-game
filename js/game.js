const game = {
    name: 'Fallen Angel',
    author: "Lakeside Project Studios - David Veral",
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
    gameMusic: undefined,
    backgroundArray: [],
    objectsArray: [],
    objectsInMovementY: [],
    objectsInMovementX: [],
    enemiesArray: [],
    lifeArray: [],
    newLife: [],
    finishArray: [],
    actualLevel: 0,

    init() {
        this.canvas = document.getElementById("Lakeside");
        this.ctx = this.canvas.getContext("2d");
        this.gameMusic = new Sound("sounds/fallen-game-sound.mp3")
        this.setDimensions();
        this.setWindowsMove();
        this.start();
        this.resetButton()
        this.restartButton()
        this.audioButton()
    },
    start() {
        this.reset()
        this.gameMusic.play()

        this.interval = setInterval(() => {
            this.framesCounter++

            if (this.framesCounter > 10000) this.framesCounter = 0
            this.clearScreen()
            this.drawAll()
            this.moveALl()
            this.isCollision()
            this.enemiesCollision()
            this.bulletCollision()
            this.bulletEnemyCollision()
            this.scoreLife()
            this.win()
            this.player.posY >= this.windowsSize.height ? this.gameOver() : null
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
        this.finishArray = []

        this.level()

        //Player
        this.player = new Player(this.ctx, this.windowsSize.width, this.windowsSize.height, this.keys, this.framesCounter)

    },
    drawAll() {
        this.backgroundArray.forEach(obs => obs.draw())
        this.lifeArray.forEach(obs => obs.draw())
        this.objectsArray.forEach(obs => obs.draw())
        this.newLife.forEach(obs => obs.draw())
        this.enemiesArray.forEach(obs => obs.draw(this.framesCounter))
        this.finishArray.forEach(obs => obs.draw())

        this.player.draw(this.framesCounter);
    },
    moveALl() {
        this.player.move(this.framesCounter);
        this.objectsArray.forEach(obs => obs.move())
        this.enemiesArray.forEach(obs => obs.move())
    },
    scoreLife() {
        if (this.player.playerLife >= 3) this.lifeArray.push(new Object(this.ctx, 100, 100, this.windowsSize.width, this.windowsSize.height, this.windowsSize.width - 120, 20, 'images/pads/score03.png'))
        else if (this.player.playerLife === 2) this.lifeArray.push(new Object(this.ctx, 100, 100, this.windowsSize.width, this.windowsSize.height, this.windowsSize.width - 120, 20, 'images/pads/score02.png'))
        else if (this.player.playerLife === 1) this.lifeArray.push(new Object(this.ctx, 100, 100, this.windowsSize.width, this.windowsSize.height, this.windowsSize.width - 120, 20, 'images/pads/score01.png'))
        else this.gameOver()
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
                this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.player.posY0 = obs.posY - this.player.height
                obs._direction == 'horizontal' ? this.player.posX -= obs.vel : null

            } else {
                this.player.posY0 += .5
                obs._direction == 'horizontal' ? this.player.posX0 += 1 : null
            }
        })
        // New Life
        this.newLife.forEach((obs) => {

            if (this.player.posX + this.player.width - 10 >= obs.posX &&
                this.player.posY + this.player.height >= obs.posY &&
                this.player.posX <= obs.posX + obs._width - 30 &&
                this.player.posY + this.player.height <= obs.posY + obs._height
            ) {
                this.player.playerLife += 1;
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
                    this.player.playerLife--
                } else if (this.player.posX + this.player.width + enemy.width >= enemy.posX) {
                    this.player.posX = enemy.posX + this.player.width;
                    this.player.playerLife--
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
                        enemy.enemyLife <= 0 ? this.enemiesArray.splice(idx, 1) : null
                    }
                })
            });
    },

    bulletEnemyCollision() {
        //Bullets impact
        this.enemiesArray.forEach(
            (enemy, idx) => {
                enemy.bulletsEnemy.forEach((bullet, idxBullet) => {
                    if (bullet.posX + bullet.radius >= this.player.posX &&
                        bullet.posY + bullet.radius >= this.player.posY &&
                        bullet.posX <= this.player.posX + this.player.width &&
                        bullet.posY + bullet.radius <= this.player.posY + this.player.height) {
                        this.player.playerLife--
                        enemy.bulletsEnemy.splice(idxBullet, 1)
                    }
                })
            });
    },
    win() {
        //WIN
        this.finishArray.forEach((final) => {
            if (this.player.posX >= final.posX &&
                this.player.posX <= final.posX + final._width - 100 &&
                this.player.posY + this.player.height <= final.posY + final._height
            ) {
                this.youWin()
                clearInterval(this.interval)
                // Wait 10 sec
                this.actualLevel != backgrounds.length - 1 ? setTimeout(() => {
                    this.changeLevel()
                }, 5000) : null
            }

        })
    },

    youWin() {

        let myImage = new Image()
        this.actualLevel != backgrounds.length - 1 ? myImage.src = 'images/game-win.png' : myImage.src = 'images/big-win.png'
        myImage.onload = () => this.ctx.drawImage(myImage, this.windowsSize.width / 2 - 180, this.windowsSize.height / 2 - 200, 400, 400)

    },

    changeLevel() {
        this.clearScreen()
        this.gameMusic._sound.currentTime = 0
        this.actualLevel < backgrounds.length - 1 ? this.actualLevel++ : this.actualLevel = 0
        this.start()
    },

    gameOver() {
        let myImage = new Image()
        myImage.src = 'images/game-over.png'
        myImage.onload = () => this.ctx.drawImage(myImage, this.windowsSize.width / 2 - 180, this.windowsSize.height / 2 - 200, 400, 400)
        this.gameMusic.stop()
        let audioGameOver = document.createElement("audio")
        audioGameOver.src = "sounds/game-over.mp3"
        audioGameOver.volume = 0.8
        audioGameOver.play()
        clearInterval(this.interval);
    },

    audioButton() {
        document.getElementById("audio-button").onclick = function () {
            this.gameMusic._sound.paused == false ? this.gameMusic.stop() : this.gameMusic.play()
        }.bind(game);

    },

    resetButton() {
        document.getElementById("reset-button").onclick = function () {
            clearInterval(this.interval);
            this.clearScreen()
            this.gameMusic._sound.currentTime = 0

            this.start()

        }.bind(game)
    },

    restartButton() {
        document.getElementById("restart-button").onclick = function () {
            clearInterval(this.interval);
            this.clearScreen()
            this.actualLevel = 0
            this.gameMusic._sound.currentTime = 0
            this.start()
        }.bind(game)
    },

    level() {
        // Map
        backgrounds[this.actualLevel].forEach(backgrounds => this.backgroundArray.push(backgrounds))
        objects[this.actualLevel].forEach(object => this.objectsArray.push(object))
        enemies[this.actualLevel].forEach(enemy => this.enemiesArray.push(enemy))

        // New life
        powerObjects[this.actualLevel].forEach(obs => this.newLife.push(obs))

        //Finish
        finishImage[this.actualLevel].forEach(img => this.finishArray.push(img))

    },


}