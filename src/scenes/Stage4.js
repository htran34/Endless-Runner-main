class Stage4 extends Phaser.Scene {
    constructor() {
        super("playScene4");
    }

    preload() {
        // load images/tile sprites
        this.load.image('mario', './assets/mario.png');
        this.load.image('background', './assets/scene0.png');
        this.load.image('pipe', './assets/pipeHitbox.png');
        this.load.image('box2', './assets/box2Hitbox.png');
        this.load.image('coin', './assets/coin.png');
        this.load.audio('music', './assets/backgroundMusic.wav');
        this.load.audio('jump', './assets/marioJump.wav');
        this.load.audio('powerup', './assets/powerup.wav');
    }

    create() {
        // boolean to check if game has to be restarted from a player loss
        this.gameEnded = false;

        // display score
        this.scoreDisplay = this.add.text(50, 50, 'SCORE: ' + score);
        this.scoreDisplay.setDepth(999);

        // deactivate space key capture from menu
        this.input.keyboard.removeCapture('SPACE');

        // play running sound
        this.run = this.sound.add('running', soundConfig);
        this.run.play();

        // load background image
        this.add.image(320, 240, 'background');

        // create Mario player sprite
        this.player = this.physics.add.sprite(0, 371, 'mario');
        this.player.setGravityY(500);

        // // adding ground 
        // // // source: https://phasergames.com/how-to-jump-in-phaser-3/#google_vignette
        this.ground = this.physics.add.sprite(320, 409, "block").setVisible(false);
        this.ground.displayWidth = 640 * 1.5;

        // adding hitboxes for pipe & boxes
        this.coinX = generateRandom(40 , 60);
        this.pipe = this.physics.add.sprite(generateRandom(250, 600), 341, 'pipe').setVisible(true);
        this.box2 = this.physics.add.sprite(500, 270, 'box2').setVisible(true);
        this.coin = this.physics.add.sprite(this.coinX, 371, 'coin').setVisible(true);
        let objects = [this.ground, this.pipe, this.box2]

        // adding collisions 
        for (let i = 0; i < objects.length; i++) {
            objects[i].setImmovable();
            this.physics.add.collider(this.player, objects[i]); 
        }

        // mario powerup (coin)
        this.coin.setImmovable();
        this.coinSound = this.sound.add('powerup');
        this.coinSound.play();
        score += 500;
    }

    update() {
        // check if game has to be restarted from a player loss
        // and allow player to restart with SPACE if game has ended
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (this.gameEnded && Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.player.setVisible(true);
            this.scene.start('playScene1');
        }

        // detect player collisions with objects
        if (this.player.body.touching.right || this.player.body.touching.up) {
            this.gameOver();
        }

        // moves Mario across the screen when within current playscene
        // & move onto next scene once Mario completes current playscne
        if (this.player.x < 640 ) {
            this.player.setVelocityX(150);
        }
        else {
            this.run.stop()
            this.coinSound.stop();
            this.scene.start('playScene5');
        }

        // jump movement (on spacekey pressed)
        if (keySpace.isDown) {
            this.jump();
        }

        // update score
        this.scoreDisplay.text = 'SCORE: ' + score;
    }

    jump() {
        if (this.player.body.onFloor()) {
            this.player.setVelocityY(-500);
            this.sound.play('jump');
            score += 150;
        }
    }

    gameOver() {
        stage6 = false;
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.setVisible(false);
        this.game.sound.stopAll();
        this.gameEnded = true;
        score = 0;
    }
}