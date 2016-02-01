// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Enemy coordinates
    this.x = x;
    this.y = y;
    this.speed = ((Math.random() * 10) + 100);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 505) {
        this.x = this.x + (this.speed * dt);
    } else {
        this.speed = ((Math.random() * 10) + 100);
        this.x = -90 + (this.speed * dt);
    }
    // Reverse movement
    // if (this.x > -90) {
    //     this.x = this.x - ((level + this.speed) * dt);
    // } else {
    //     this.speed = 30; //((Math.random() * 100) + 1);
    //     this.x = 505 - ((level + this.speed) * dt);
    // }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {

    // Player coordinates
    this.x = x;
    this.y = y;

    this.score = 0;
    this.lives = 3;
    this.message = "Press Space Bar to Play.";
    this.demoMode = true;
    // Player image
    this.sprite = 'images/char-boy.png';

    this.update = function() {

        if (this.collisionCheck()) {
            console.log("COLLISION!!");
            Score.message = "Ouch! Try Again!";
            this.resetPosition();
            Score.updateLives();
        }
        if (this.homeCheck()) {
            console.log("HOME!!");
            Score.message = "Score!!!";
            this.resetPosition();
            Score.updateScore();
        }
    };

    this.collisionCheck = function() {
        var spriteHeight = 83,
            playerLoc = [this.x, this.y];

        for (var i = 0; i < allEnemies.length; i++) {
            var spriteLeft = allEnemies[i].x + -80,
                spriteRight = spriteLeft + 158;

            if (playerLoc[0] > spriteLeft && playerLoc[0] < spriteRight) {
                if (playerLoc[1] > allEnemies[i].y &&
                    playerLoc[1] < allEnemies[i].y + spriteHeight) {
                    return true;
                }
            }
        }
        return false;
    };

    this.homeCheck = function() {
        if (this.y < 71) {
            return true;
        }
        return false;
    };

    this.resetPosition = function(status) {
        this.x = 202;
        this.y = 403;
    };

    this.render = function() {
        // Draw Character
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // For each acceptable keyPress, this function will update the x, y
    // coordinates of the Player class.
    this.handleInput = function(keyPress){
        var xMove = 101,
            yMove = 83;

        if (keyPress == 'spacebar') {
            Score.demoMode = false;
            Score.message = "Move using WASD or Arrow Keys";
        }
        if (Score.demoMode === true) {
            Score.message = "Press Space Bar to Play.";
        }
        if (Score.demoMode === false) {
            switch (keyPress) {
                case 'left':
                    // console.log('pressed left');
                    if (this.x > 0) {
                        this.x -= xMove;
                    }
                    break;
                case 'right':
                    // console.log('pressed right');
                    if (this.x < ctx.canvas.clientWidth - xMove) {
                        this.x += xMove;
                    }
                    break;
                case 'down':
                    // console.log('pressed down');
                    if (this.y < ctx.canvas.clientHeight - (yMove * 3)) {
                        this.y += yMove;
                    }
                    break;
                case 'up':
                    // console.log('pressed up');
                    if (this.y > 0) {
                    this.y -= yMove;
                    }
                    break;
            }
        }
    };
};

// Score tracking
var Score = {

    playerScore: 0,
    playerLives: 3,
    demoMode: true,
    message: "",

    updateScore: function() {
        this.playerScore += 10;
        return this.playerScore;
    },

    updateLives: function() {
        this.playerLives -= 1;
        return this.playerLives;
    },

    resetScore: function() {
        this.playerScore = 0;
        this.playerLives = 3;
        return (this.playerScore, this.playerLives);
    },

    render: function() {

        var scoreLoc = [15, 570],
        livesLoc = [390, 570],
        msgLoc = [251, 100];

        if (this.demoMode === true) {
            this.message = "Press Spacebar to Play"
        }

        // Draw Score and Lives
        ctx.font = "bold 20pt Arial";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.textAlign = "left"
        ctx.fillText("Score: " + Score.playerScore, scoreLoc[0], scoreLoc[1]);
        ctx.strokeText("Score: " + Score.playerScore, scoreLoc[0], scoreLoc[1]);
        ctx.fillText("Lives: " + Score.playerLives, livesLoc[0], livesLoc[1]);
        ctx.strokeText("Lives: " + Score.playerLives, livesLoc[0], livesLoc[1]);
        // Draw Messages
        ctx.font = "bold 24pt Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.message, msgLoc[0], msgLoc[1]);
        ctx.strokeText(this.message, msgLoc[0], msgLoc[1]);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// var allEnemies = []

var foeTop = new Enemy(-70, 60),
    foeMid = new Enemy(-70, 143),
    foeBot = new Enemy(-70, 227);
var allEnemies = [foeTop, foeMid, foeBot];
var player = new Player(202, 403);
var level = 1;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
