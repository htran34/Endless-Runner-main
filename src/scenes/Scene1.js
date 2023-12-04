class Scene1 extends Phaser.Scene {
    constructor() {
        super("MASSADORA")
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('background1', './assets/background.png')
        this.load.audio('music', './assets/backgroundMusic.wav')
    }

    create() {
        // boolean to check if game has to be restarted from a player loss
        this.gameEnded = false;

        // // display score
        // this.scoreDisplay = this.add.text(50, 50, 'CARDS COLLECTED: ' + score)
        // this.scoreDisplay.setDepth(999)

        // deactivate & reset space key capture from menu
        this.input.keyboard.removeCapture('SPACE')
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // play music
        this.music = this.sound.play('music', soundConfig)

        // load background image
        this.add.image(320, 240, 'background1')

        // load player sprite
        this.add.image(150, 400, 'player')

        // Dialogue
        this.dialogue1 = this.add.text(20, 300, "Welcome to Massadora, starting point of")
        this.dialogue2 = this.add.text(20, 325, "Greed Island where all players begin!")
        if (firstSpawn) {
            this.dialogue3 = this.add.text(20, 350, "There's many different cards in Greed Island but for now,")
            this.dialogue4 = this.add.text(20, 375, "all players just begin with the card Accompany.")
            this.dialogue5 = this.add.text(20, 400, "Here's 5 copies of Accompany. Use Accompany to travel to")
            this.dialogue6 = this.add.text(20, 425, "any location on the island!")
            firstSpawn = false
        }
        this.dialogue3 = this.add.text(20, 450, "(Press SPACE to view the game options menu.)")
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keySpace)) {
          this.scene.start('selectScene')
      }
    }
}