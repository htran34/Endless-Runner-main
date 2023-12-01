class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('titleBox', './assets/menuTitle.png');
        this.load.audio('start', './assets/gameStart.wav');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontSize: '28px',
            align: 'center',
            strokeThickness: 3
        }

        // display various menu elements
        this.add.rectangle(200, 0, 1000, 1000, 0x63a0fd);   // sets menu background color 
        this.title = this.add.image(320, 100, 'titleBox');               
        this.add.text(150, 300, 'PRESS SPACE TO', menuConfig);
        this.add.text(150, 350, 'START, JUMP, OR RESTART', menuConfig);

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // initialize score
        score = 0;
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            game.settings = {}
            this.title.destroy();
            this.sound.play('start');
            this.scene.start('playScene1');    
          }
    }
}