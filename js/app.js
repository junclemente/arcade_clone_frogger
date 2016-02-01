/**
 * Enemies our player must avoid
 *
 * @constructor
 * @param {number} x - x coordinate of Enemy
 * @param {number} y - y coordinate of Enemy
 */
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Enemy coordinates
    this.x = x;
    this.y = y;
    this.gameLevelSpeed = Score.gameLevel * 10;
    this.speed = ((Math.random() * 30) + 80 + this.gameLevelSpeed);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/**
 * Update the enemy's position, required method for game
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function(dt) {
     // You should multiply any movement by the dt parameter
     // which will ensure the game runs at the same speed for
     // all computers.
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.speed = ((Math.random() * 30) + 80 + this.gameLevelSpeed);
        this.x = -90 + (this.speed * dt);
    }
};

/** Draw the enemy on the screen, required method for game */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Represents Player
 *
 * @constructor
 * @param {number} x - x coordinate of Player
 * @param {number} y - y coordinate of PLayer
 */
var Player = function(x, y) {

    var X_HOME = 202,
        Y_HOME = 403,
        Y_HOME_CHECK = 71,
        X_MOVE = 101,
        Y_MOVE = 83,
        SPRITE_HEIGHT = 83;

    // Player coordinates
    this.x = x;
    this.y = y;

    // Player image
    this.sprite = 'images/char-boy.png';

    /**
     * Calls Player location reset and updates score/lives
     * based on collision and home checks
     */
    this.update = function() {

        if (this.collisionCheck()) {
            console.log("COLLISION!!");
            Score.message = "Ouch! Try Again!";
            Score.updateLives();
            this.resetPosition();
        }
        if (this.homeCheck()) {
            console.log("HOME!!");
            Score.message = "Score!!!";
            Score.updateScore();
            this.resetPosition();
        }
    };

    /** Checks Player collision with allEnemies */
    this.collisionCheck = function() {
        var playerLoc = [this.x, this.y];

        for (var i = 0; i < allEnemies.length; i++) {
            var spriteLeft = allEnemies[i].x + -80,
                spriteRight = spriteLeft + 158;

            if (playerLoc[0] > spriteLeft && playerLoc[0] < spriteRight) {
                if (playerLoc[1] > allEnemies[i].y &&
                    playerLoc[1] < allEnemies[i].y + SPRITE_HEIGHT) {
                    return true;
                }
            }
        }
        return false;
    };

    /** Checks if Player makes it to home row */
    this.homeCheck = function() {
        if (this.y < Y_HOME_CHECK) {
            return true;
        }
        return false;
    };

    /** Resets Player location */
    this.resetPosition = function() {
        this.x = X_HOME;
        this.y = Y_HOME;
    };

    this.render = function() {
        // Draw Character
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    /**
     * For each acceptable keyPress, this function will update the x, y
     * coordinates of the Player class.
     *
     * @param {string} keyPress - Acceptable keyPresses to move character or
     * start game
     */
    this.handleInput = function(keyPress){

        if (keyPress == 'spacebar') {
            Score.demoMode = false;
            Score.message = "Move using WASD or Arrow Keys";
        }

        if (Score.demoMode === false) {
            switch (keyPress) {
                case 'left':
                    if (this.x > 0) {
                        this.x -= X_MOVE;
                    }
                    break;
                case 'right':
                    if (this.x < ctx.canvas.clientWidth - X_MOVE) {
                        this.x += X_MOVE;
                    }
                    break;
                case 'down':
                    if (this.y < ctx.canvas.clientHeight - (Y_MOVE * 3)) {
                        this.y += Y_MOVE;
                    }
                    break;
                case 'up':
                    if (this.y > 0) {
                    this.y -= Y_MOVE;
                    }
                    break;
                default:
                    console.log('keyPress not acceptable');
                    break;
            }
        }
    };
};

/**
 * Score object to keep track of score, lives and game state.
 */
var Score = {

    playerScore: 0,
    playerLives: 2,
    gameLevel: 0,
    demoMode: true,
    message: "Press Spacebar to Play.",

    updateScore: function() {
        this.playerScore += 10;
        if (this.playerScore % 100 === 0) {
            this.gameLevel = (this.playerScore / 100);
        }
        console.log(this.gameLevel);
        return (this.playerScore, this.gameLevel);
    },

    /** Updates lives and determines if all lives have been used */
    updateLives: function() {
        if (this.playerLives > 0) {
            this.playerLives -= 1;
            return this.playerLives;
        } else {
            this.message = "Game over!";
            this.demoMode = true;
            var self = this;
            setTimeout(function() {self.resetGame();}, 3000);
        }
    },

    /** Resets game state */
    resetGame: function() {
        this.playerScore = 0;
        this.playerLives = 2;
        this.gameLevel = 0;
        this.demoMode = true;
        this.message = "Press Space Bar to Play.";
        return console.log("Game Reset. Demo mode", this.playerScore, this.playerLives);
    },

    /** Renders Score, Lives and Messages */
    render: function() {

        var SCORE_LOC = [15, 570],
            LIVES_LOC = [390, 570],
            LEVEL_LOC = [251, 570],
            MSG_LOC = [251, 100];

        // Draw Score Info
        ctx.font = "bold 20pt Arial";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        // Draw Score Info
        ctx.fillText("Score: " + Score.playerScore, SCORE_LOC[0], SCORE_LOC[1]);
        ctx.strokeText("Score: " + Score.playerScore, SCORE_LOC [0], SCORE_LOC[1]);
        // Draw Lives Info
        ctx.fillText("Lives: " + Score.playerLives, LIVES_LOC[0], LIVES_LOC[1]);
        ctx.strokeText("Lives: " + Score.playerLives, LIVES_LOC[0], LIVES_LOC[1]);
        // Draw Level Info
        ctx.textAlign = "center";
        ctx.fillText("Level: " + Score.gameLevel, LEVEL_LOC[0], LEVEL_LOC[1]);
        ctx.strokeText("Level: " + Score.gameLevel, LEVEL_LOC[0], LEVEL_LOC[1]);
        // Draw Message at top of canvas
        ctx.font = "bold 22pt Arial";
        ctx.fillText(this.message, MSG_LOC[0], MSG_LOC[1]);
        ctx.strokeText(this.message, MSG_LOC  [0], MSG_LOC  [1]);
    },
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var foeTop = new Enemy(-70, 60),
    foeMid = new Enemy(-70, 143),
    foeBot = new Enemy(-70, 227);
var allEnemies = [foeTop, foeMid, foeBot];
var player = new Player(202, 403);

/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    // console.log(e.keyCode);
    var allowedKeys = {
        // Arrow keys
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        // wasd keys
        65: 'left',
        87: 'up',
        68: 'right',
        83: 'down',
        // other keys
        32: 'spacebar'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
