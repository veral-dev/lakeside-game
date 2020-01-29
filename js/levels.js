let ctx = document.getElementById("Lakeside").getContext("2d")
const level = [
    new Background(ctx, game.windowsSize.width, game.windowsSize.height, 0, 0, 'images/background/sky-night.png'),
    new Background(ctx, game.windowsSize.width, game.windowsSize.height, 0, 0, 'images/background/rocks.png'),
    new Background(ctx, 510, 104, game.windowsSize.width / 2 - 255, 20, 'images/game-logo.png'),
    // ONE FLOOR
    new Object(ctx, 300, 50, game.windowsSize.width, game.windowsSize.height, 0, game.windowsSize.height - 60, 'images/pads/green-floor.png'),
    new Object(ctx, 100, 30, game.windowsSize.width, game.windowsSize.height, 340, game.windowsSize.height - 80, 'images/pads/rock-floor.png'),
    new Object(ctx, 300, 35, game.windowsSize.width, game.windowsSize.height, 500, game.windowsSize.height - 80, 'images/pads/rock-floor.png'),
    new Object(ctx, 100, 30, game.windowsSize.width, game.windowsSize.height, 890, game.windowsSize.height - 80, 'images/pads/rock-floor.png'),

    new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 1050, game.windowsSize.height - 80, 'images/pads/tree-floor.png', 1050, game.windowsSize.height - 80, 110),

    // SECOND FLOOR
    new Object(ctx, 500, 40, game.windowsSize.width, game.windowsSize.height, 500, game.windowsSize.height - 200, 'images/pads/sand-floor.png'),
    new Object(ctx, 200, 30, game.windowsSize.width, game.windowsSize.height, 10, game.windowsSize.height - 200, 'images/pads/sand-floor.png'),

    // Third floor
    new Object(ctx, 40, 40, game.windowsSize.width, game.windowsSize.height, 10, game.windowsSize.height - 235, 'images/pads/rock.png'),
    new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 50, game.windowsSize.height - 300, 'images/pads/sand-floor.png'),
    new Object(ctx, 80, 20, game.windowsSize.width, game.windowsSize.height, 150, game.windowsSize.height - 290, 'images/pads/sand-floor.png'),
    new Object(ctx, 260, 30, game.windowsSize.width, game.windowsSize.height, 250, game.windowsSize.height - 310, 'images/pads/sand-floor.png'),

    new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 570, game.windowsSize.height - 305, 'images/pads/rock-floor.png'),
    new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 690, game.windowsSize.height - 305, 'images/pads/rock-floor.png'),
    new Object(ctx, 60, 20, game.windowsSize.width, game.windowsSize.height, 810, game.windowsSize.height - 305, 'images/pads/rock-floor.png'),


    // FINAL FLOOR
    new Object(ctx, 300, 35, game.windowsSize.width, game.windowsSize.height, 550, game.windowsSize.height - 420, 'images/pads/sand-floor.png'),
    new Object(ctx, 300, 40, game.windowsSize.width, game.windowsSize.height, 250, game.windowsSize.height - 450, 'images/pads/sand-floor.png'),


    new Object(ctx, 200, 40, game.windowsSize.width, game.windowsSize.height, 40, 140, 'images/pads/sand-floor.png'),



]