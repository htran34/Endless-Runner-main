class mainMenu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.audio('start', './assets/gameStart.wav')
    }

    create() {
        // display various menu elements
        this.add.rectangle(200, 0, 1000, 1000, 0x63a0fd)   // sets menu background color              
        this.add.text(150, 300, 'PRESS SPACE TO START', textConfig)

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // initialize score
        score = 0

        // initialize all NPC player locations at random cities
        for (let i = 1; i < players.length; i++) {
            locations[players[i]] = Math.random(1, 6)
        }
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            game.settings = {}
            currentScene  = 1
            this.sound.play('start')
            this.scene.start('MASSADORA')
          }
    }
}