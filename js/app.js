// Enemies our player must avoid
var Enemy = function(x, y, level) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Enemy coordinates
    this.x = x;
    this.y = y;
    this.level = 1;
    this.speed = ((Math.random() * 10) + 50);

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
    var count = 0;
    if (this.x < 505) {
        this.x = this.x + (this.level * (this.speed * dt));
    } else {
        // this.speed = ((Math.random() * 100) + 1);
        this.speed += 20;
        this.x = -90 + (this.level * (this.speed * dt));

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
            this.message = "Ouch! Try Again!";
            this.resetPosition();
            this.lives -= 1;
        }
        if (this.homeCheck()) {
            console.log("HOME!!");
            this.message = "Score!!!";
            this.resetPosition();
            this.score += 10;
        }
    }

    this.collisionCheck = function() {
        var spriteHeight = 83,
            playerLoc = [this.x, this.y];

        for (var i = 0; i < allEnemies.length; i++) {
            var spriteLeft = allEnemies[i].x + -80,
                spriteRight = spriteLeft + 158;

            if (playerLoc[0] > spriteLeft && playerLoc[0] < spriteRight) {
                if (playerLoc[1] > allEnemies[i].y && playerLoc[1] < allEnemies[i].y + spriteHeight) {
                    return true;
                }
            }
        }
        return false;
    }

    this.homeCheck = function() {
        if (this.y < 71) {
            return true;
        }
        return false;
    }

    this.resetPosition = function(status) {
        this.x = 202;
        this.y = 403;
    }

    this.render = function() {
        var scoreLoc = [15, 570],
            livesLoc = [390, 570],
            msgLoc = [251, 100];

        // Draw Score and Lives
        ctx.font = "bold 20pt Arial";
        ctx.strokeStyle = "black";
        ctx.fillStyle = "white";
        ctx.textAlign = "left"
        ctx.fillText("Score: " + this.score, scoreLoc[0], scoreLoc[1]);
        ctx.strokeText("Score: " + this.score, scoreLoc[0], scoreLoc[1]);
        ctx.fillText("Lives: " + this.lives, livesLoc[0], livesLoc[1]);
        ctx.strokeText("Lives: " + this.lives, livesLoc[0], livesLoc[1]);
        // Draw Messages
        ctx.font = "bold 24pt Arial";
        ctx.textAlign = "center";
        ctx.fillText(this.message, msgLoc[0], msgLoc[1]);
        ctx.strokeText(this.message, msgLoc[0], msgLoc[1]);
        // Draw Character
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // For each acceptable keyPress, this function will update the x, y
    // coordinates of the Player class.
    this.handleInput = function(keyPress){
        var xMove = 101,
            yMove = 83;

        if (keyPress == 'spacebar') {
            this.demoMode == true;
            this.message = "";
        }
        if (this.demoMode == false) {
            this.message = "Press Space Bar to Play.";
        }
        if (this.demoMode == true) {
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
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var foeTop = new Enemy(-70, 60),
    foeMid = new Enemy(-70, 143),
    foeBot = new Enemy(-70, 227);
var allEnemies = [foeTop, foeMid, foeBot];
// var allEnemies = [foeTop];
var player = new Player(202, 403);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    console.log(e.keyCode);
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
