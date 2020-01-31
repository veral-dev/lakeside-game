let ctx = document.getElementById("Lakeside").getContext("2d")
const backgrounds = [
    [
        new Background(ctx, game.windowsSize.width, game.windowsSize.height, 0, 0, 'images/background/sky-night.png'),
        new Background(ctx, game.windowsSize.width, game.windowsSize.height, 0, 0, 'images/background/rocks.png'),
        new Background(ctx, 400, 95, game.windowsSize.width / 2 - 175, 20, 'images/game-logo.png'),
    ],
    [
        new Background(ctx, game.windowsSize.width, game.windowsSize.height, 0, 0, 'images/background/sky-night.png'),
        new Background(ctx, game.windowsSize.width, game.windowsSize.height, 0, 0, 'images/background/rocks2.png'),
        new Background(ctx, 400, 95, game.windowsSize.width / 2 - 175, 20, 'images/game-logo.png'),

    ]
]

const objects = [
    [
        new Object(ctx, 300, 50, game.windowsSize.width, game.windowsSize.height, 0, game.windowsSize.height - 60, 'images/pads/green-floor.png'),
        new Object(ctx, 100, 30, game.windowsSize.width, game.windowsSize.height, 340, game.windowsSize.height - 80, 'images/pads/rock-floor.png'),
        new Object(ctx, 300, 35, game.windowsSize.width, game.windowsSize.height, 500, game.windowsSize.height - 80, 'images/pads/rock-floor.png'),
        new Object(ctx, 100, 30, game.windowsSize.width, game.windowsSize.height, 890, game.windowsSize.height - 80, 'images/pads/rock-floor.png'),
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 1050, game.windowsSize.height - 80, 'images/pads/tree-floor.png', 1050, game.windowsSize.height - 80, 110, 'vertical'),

        //Second floor
        new Object(ctx, 500, 40, game.windowsSize.width, game.windowsSize.height, 500, game.windowsSize.height - 200, 'images/pads/sand-floor.png'),
        new Object(ctx, 200, 30, game.windowsSize.width, game.windowsSize.height, 10, game.windowsSize.height - 200, 'images/pads/sand-floor.png'),
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 350, game.windowsSize.height - 200, 'images/pads/tree-floor.png', 390, game.windowsSize.height - 200, 130, 'horizontal'),

        // Third floor
        new Object(ctx, 40, 40, game.windowsSize.width, game.windowsSize.height, 10, game.windowsSize.height - 235, 'images/pads/rock.png'),
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 50, game.windowsSize.height - 300, 'images/pads/sand-floor.png'),
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 150, game.windowsSize.height - 290, 'images/pads/sand-floor.png'),
        new Object(ctx, 260, 30, game.windowsSize.width, game.windowsSize.height, 250, game.windowsSize.height - 305, 'images/pads/sand-floor.png'),

        new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 570, game.windowsSize.height - 305, 'images/pads/rock-floor.png'),
        new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 690, game.windowsSize.height - 305, 'images/pads/rock-floor.png'),
        new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 810, game.windowsSize.height - 305, 'images/pads/rock-floor.png'),

        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 970, game.windowsSize.height - 300, 'images/pads/tree-floor.png', 970, game.windowsSize.height - 300, 60, 'horizontal'),
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 1100, game.windowsSize.height - 300, 'images/pads/tree-floor.png', 1100, game.windowsSize.height - 300, 80, 'vertical'),

        // Final
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 970, game.windowsSize.height - 410, 'images/pads/tree-floor.png', 990, game.windowsSize.height - 410, 80, 'horizontal'),
        new Object(ctx, 300, 35, game.windowsSize.width, game.windowsSize.height, 550, game.windowsSize.height - 420, 'images/pads/sand-floor.png'),
        new Object(ctx, 300, 40, game.windowsSize.width, game.windowsSize.height, 250, game.windowsSize.height - 450, 'images/pads/sand-floor.png'),
        new Object(ctx, 200, 40, game.windowsSize.width, game.windowsSize.height, 40, 140, 'images/pads/sand-floor.png'),
    ],
    [
        new Object(ctx, 100, 30, game.windowsSize.width, game.windowsSize.height, 0, game.windowsSize.height - 60, 'images/pads/city-floor.png'),
        new Object(ctx, 100, 30, game.windowsSize.width, game.windowsSize.height, 90, game.windowsSize.height - 120, 'images/pads/rock-floor.png'),
        new Object(ctx, 100, 30, game.windowsSize.width, game.windowsSize.height, 200, game.windowsSize.height - 120, 'images/pads/rock-floor.png'),
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 320, game.windowsSize.height - 120, 'images/pads/tree-floor.png', 620, game.windowsSize.height - 200, 300, 'horizontal'),
        new Object(ctx, 40, 40, game.windowsSize.width, game.windowsSize.height, 430, game.windowsSize.height - 160, 'images/pads/rock.png'),
        new Object(ctx, 40, 40, game.windowsSize.width, game.windowsSize.height, 550, game.windowsSize.height - 160, 'images/pads/rock.png'),
        new Object(ctx, 250, 35, game.windowsSize.width, game.windowsSize.height, 740, game.windowsSize.height - 120, 'images/pads/rock-floor.png'),

        //Second floor
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 1050, game.windowsSize.height - 100, 'images/pads/tree-floor.png', 1050, game.windowsSize.height - 100, 140, 'vertical'),
        new Object(ctx, 250, 35, game.windowsSize.width, game.windowsSize.height, 740, game.windowsSize.height - 240, 'images/pads/rock-floor.png'),
        new Object(ctx, 250, 35, game.windowsSize.width, game.windowsSize.height, 460, game.windowsSize.height - 250, 'images/pads/rock-floor.png'),
        new Object(ctx, 50, 20, game.windowsSize.width, game.windowsSize.height, 255, game.windowsSize.height - 240, 'images/pads/sand-floor.png'),
        new Object(ctx, 50, 20, game.windowsSize.width, game.windowsSize.height, 355, game.windowsSize.height - 230, 'images/pads/sand-floor.png'),
        new Object(ctx, 160, 30, game.windowsSize.width, game.windowsSize.height, 40, game.windowsSize.height - 240, 'images/pads/rock-floor.png'),
        new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 50, game.windowsSize.height - 300, 'images/pads/tree-floor.png', 50, game.windowsSize.height - 300, 80, 'vertical'),

        // Third floor
        new Object(ctx, 250, 30, game.windowsSize.width, game.windowsSize.height, 170, game.windowsSize.height - 350, 'images/pads/rock-floor.png'),
        new Object(ctx, 50, 20, game.windowsSize.width, game.windowsSize.height, 480, game.windowsSize.height - 340, 'images/pads/sand-floor.png'),
        new Object(ctx, 50, 20, game.windowsSize.width, game.windowsSize.height, 560, game.windowsSize.height - 330, 'images/pads/sand-floor.png'),
        new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 700, game.windowsSize.height - 330, 'images/pads/tree-floor.png', 780, game.windowsSize.height - 330, 140, 'horizontal'),
        new Object(ctx, 120, 30, game.windowsSize.width, game.windowsSize.height, 880, game.windowsSize.height - 330, 'images/pads/rock-floor.png'),
        new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 1050, game.windowsSize.height - 330, 'images/pads/tree-floor.png', 1050, game.windowsSize.height - 330, 80, 'vertical'),
        new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 1120, game.windowsSize.height - 480, 'images/pads/tree-floor.png', 1120, game.windowsSize.height - 350, 140, 'vertical'),

        // Final
        new Object(ctx, 300, 35, game.windowsSize.width, game.windowsSize.height, 750, game.windowsSize.height - 480, 'images/pads/sand-floor.png'),
        new Object(ctx, 60, 30, game.windowsSize.width, game.windowsSize.height, 620, game.windowsSize.height - 450, 'images/pads/tree-floor.png', 800, game.windowsSize.height - 450, 80, 'vertical'),
        new Object(ctx, 300, 40, game.windowsSize.width, game.windowsSize.height, 250, game.windowsSize.height - 460, 'images/pads/sand-floor.png'),
        new Object(ctx, 200, 40, game.windowsSize.width, game.windowsSize.height, 40, 140, 'images/pads/sand-floor.png'),

    ],
]

const enemies = [
    [
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 760, game.windowsSize.height - 140, 760, game.windowsSize.height - 120, 'images/enemies/enemy1-final.png', 250),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 940, game.windowsSize.height - 260, 940, game.windowsSize.height - 240, 'images/enemies/enemy1-final.png', 400),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 550, game.windowsSize.height - 260, 940, game.windowsSize.height - 240, 'images/enemies/enemy1-final.png', 400),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 800, game.windowsSize.height - 485, 800, game.windowsSize.height - 465, 'images/enemies/enemy1-final.png', 220),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 300, game.windowsSize.height - 550, 500, game.windowsSize.height - 495, 'images/enemies/enemy2-final.png', 220),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 450, game.windowsSize.height - 550, 500, game.windowsSize.height - 495, 'images/enemies/enemy2-final.png', 220, 'shoot'),
    ],
    [
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 900, game.windowsSize.height - 160, 940, game.windowsSize.height - 160, 'images/enemies/enemy1-final.png', 200),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 940, game.windowsSize.height - 280, 940, game.windowsSize.height - 280, 'images/enemies/enemy1-final.png', 210),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 600, game.windowsSize.height - 290, 670, game.windowsSize.height - 290, 'images/enemies/enemy1-final.png', 200),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 150, game.windowsSize.height - 280, 150, game.windowsSize.height - 280, 'images/enemies/enemy1-final.png', 110),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 240, game.windowsSize.height - 395, 350, game.windowsSize.height - 395, 'images/enemies/enemy1-final.png', 160),

        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 800, game.windowsSize.height - 550, 990, game.windowsSize.height - 520, 'images/enemies/enemy2-final.png', 220),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 300, game.windowsSize.height - 550, 490, game.windowsSize.height - 500, 'images/enemies/enemy2-final.png', 220),
        new Enemy(ctx, game.windowsSize.width, game.windowsSize.height, 450, game.windowsSize.height - 550, 490, game.windowsSize.height - 500, 'images/enemies/enemy2-final.png', 220, 'shoot'),


    ],
]

const powerObjects = [
    [new Object(ctx, 40, 40, game.windowsSize.width, game.windowsSize.height, 700, game.windowsSize.height - 370, 'images/pads/new-life.png'),

    ],
    [new Object(ctx, 40, 40, game.windowsSize.width, game.windowsSize.height, 700, game.windowsSize.height - 400, 'images/pads/new-life.png'), ],
]

const finishImage = [
    [
        new Object(ctx, 130, 130, game.windowsSize.width, game.windowsSize.height, 50, 30, 'images/pads/finish.png')
    ],
    [
        new Object(ctx, 130, 130, game.windowsSize.width, game.windowsSize.height, 50, 30, 'images/pads/finish.png')
    ],
]