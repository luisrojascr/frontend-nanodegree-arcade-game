// Enemies our player must avoid
var Enemy = function() {
    this.xRange = [-150, 600];
    this.yRange = [60, 140, 220];
    this.speedRange = [150, 600];

    this.sprite = 'images/enemy-bug.png';
    
    this.reset();
};

Enemy.prototype.reset = function() {
    this.x = this.xRange[0];
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;
    
    if(this.x > maxPos){
        this.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.getRandomY = function() {
    return this.yRange[Math.floor(Math.random() * this.yRange.length)];
};

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];
    
    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

/*
 * Player class 
*/
var Player = function(){
    this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.points = 0;
    
    this.sprite = 'images/char-boy.png';
    
    this.getPoints();
    this.reset();
};

Player.prototype.update = function(dt) {
    this.checkCollisions();
};

Player.prototype.reset = function() {
    this.x = 200;
    this.y = 380;
};

Player.prototype.checkCollisions = function(dt) {
    //if Player is on water
    if(this.y === -20) {
        console.log('player is on water!');
        this.reset();
    }else if(this.y >= 40 && this.y <= 240) {
        var self = this;
        //loop through each bug
        allEnemies.forEach(function(enemy) {
           //if it's on the same row
           if(enemy.y === self.y) {
                if(enemy.x >= player.x - 30 && enemy.x <= player.x + 30) {
                    console.log('Its on player');
                    self.reset();
                }
           }
        });
    }
    
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
};

Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys){
        case 'up': 
            this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
            break;
        case 'down': 
            this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
            break;
        case 'left': 
            this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
            break;
        case 'right': 
            this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } 
};

Player.prototype.setPoints = function(pts){
  return this.points = 'Puntos' + ' ' + pts;  
};

//Function in progress - not working yet
Player.prototype.getPoints = function(){
  this.x = 400;
  this.y = 380;
};

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];

var player = new Player();


// This listens for key presses and sends the keys to Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
