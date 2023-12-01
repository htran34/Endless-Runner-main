class Stage5 extends Phaser.Scene {
    constructor() {
        super("playScene5");
    }

    preload() {
        // load images/tile sprites
        this.load.image('mario', './assets/mario.png');
        this.load.image('background', './assets/scene0.png');
        this.load.image('pipe', './assets/pipeHitbox.png');
        this.load.image('box1', './assets/box1Hitbox.png');
        this.load.image('box2', './assets/box2Hitbox.png');
        this.load.image('plane', './assets/plane.png');
        this.load.audio('music', './assets/backgroundMusic.wav');
        this.load.audio('jump', './assets/marioJump.wav');
        this.load.audio('planeSound', './assets/plane.wav');
    }

    create() {
        // boolean to check if game has to be restarted from a player loss
        this.gameEnded = false;

        // display score
        this.scoreDisplay = this.add.text(50, 50, 'SCORE: ' + score);
        this.scoreDisplay.setDepth(999);

        // deactivate space key capture from menu
        this.input.keyboard.removeCapture('SPACE');

        // play running & plane sound
        this.run = this.sound.add('running', soundConfig);
        this.run.play();
        this.planeSound = this.sound.add('planeSound');
        this.planeSound.play();

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
        this.pipe = this.physics.add.sprite(300, 341, 'pipe').setVisible(true);
        this.box1 = this.physics.add.sprite(generateRandom(200 , 250), 270, 'box1').setVisible(true);
        this.box2 = this.physics.add.sprite(560, 270, 'box2').setVisible(true);
        this.plane = this.physics.add.sprite(500, 120, 'plane');
        let objects = [this.ground, this.pipe, this.box1, this.box2, this.plane]

        // adding collisions 
        for (let i = 0; i < objects.length; i++) {
            objects[i].setImmovable();
            this.physics.add.collider(this.player, objects[i]); 
        }
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
            this.plane.setVelocityX(-30);

        }
        else {
            stage6 = true;
            this.planeSound.stop();
            this.run.stop();
            this.scene.start('playScene1');
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
            score += 100;
        }
    }

    gameOver() {
        stage6 = false;
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.plane.setVelocityX(0);
        this.player.setVisible(false);
        this.game.sound.stopAll();
        this.gameEnded = true;
        score = 0;
    }
}