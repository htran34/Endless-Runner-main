class mainMenu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        this.load.audio('start', './assets/gameStart.wav')
        this.load.audio('music', './assets/backgroundMusic.wav')
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    create() {
        // display various menu elements
        this.add.rectangle(200, 0, 1000, 1000, 0x006400)   // sets menu background color              
        this.add.text(50, 125, 'PRESS SPACE TO START')
        this.add.text(50, 175, 'CONTROLS:')
        this.add.text(50, 200, 'USE SPACE WITHIN THE GAME TO VIEW OPTIONS MENU')
        this.add.text(50, 225, "AND TO PRESS BUTTIONS IN THE MENU.")
        this.add.text(50, 250, 'USE ARROW KEYS TO TRAVEL BETWEEN CITIES')
        this.add.text(50, 275, 'AND WHEN NAVIGATING OPTIONS IN THE MENU.')
        this.add.text(50, 300, 'USE LETTERS Q,W,E,R,T WHEN USING ACCOMPANY.')

        // define keys
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // initialize score
        score = 0

        // initialize all NPC player locations at random cities
        for (let i = 1; i < players.length; i++) {
            locations[players[i]] = this.getRandomInt(5) + 1
        }
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            game.settings = {}
            currentScene  = 1
            this.sound.play('start')
            this.music = this.sound.play('music', soundConfig)
            this.scene.start('MASSADORA')
          }
    }
}