// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // Enemy coordinates
    this.x = x;
    this.y = y;

    this.speed = ((Math.random() * 100) + 1);

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
    var level = 0;
    if (this.x < 505) {
        this.x = this.x + ((level + this.speed) * dt);
    } else {
        this.speed = ((Math.random() * 100) + 1);
        this.x = -90 + ((level + this.speed) * dt);
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

    // Player image
    this.sprite = 'images/char-boy.png';

    this.update = function() {
        var spriteHeight = 83;

        var playerLoc = [this.x, this.y]

        for (var i = 0; i < allEnemies.length; i++) {
            // Check left and right boundaries for collisions
            var spriteLeft = allEnemies[i].x + -80,
                spriteRight = spriteLeft + 158;

            if (playerLoc[0] > spriteLeft && playerLoc[0] < spriteRight){
                if (playerLoc[1] > allEnemies[i].y && playerLoc[1] < allEnemies[i].y + spriteHeight) {
                console.log("COLLISION!")
                console.log(this.x, allEnemies[i].x);
                ctx.font = '36pt Arial';
                ctx.fillText('Ouch!', 300, 300);
                this.x = 202;
                this.y = 403;
                }
            }
        }
    }

    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // For each acceptable keyPress, this function will update the x, y
    // coordinates of the Player class.
    this.handleInput = function(keyPress){
        var xMove = 101,
            yMove = 83;

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
    // console.log(e.keyCode);
    var allowedKeys = {
        // Arrow keys
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        // wasd keys
        65: 'left',  // a
        87: 'up',    // w
        68: 'right', // d
        83: 'down'   // s
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
