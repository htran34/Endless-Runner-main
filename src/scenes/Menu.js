class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.audio('start', './assets/gameStart.wav')
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontSize: '28px',
            align: 'center',
            strokeThickness: 3
        }

        // display various menu elements
        this.add.rectangle(200, 0, 1000, 1000, 0x63a0fd)   // sets menu background color              
        this.add.text(150, 300, 'PRESS SPACE TO START', menuConfig)

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // initialize score
        score = 0
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            game.settings = {}
            this.sound.play('start')
            this.scene.start('massadora')
          }
    }
}