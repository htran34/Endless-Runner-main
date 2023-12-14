class Scene5 extends Phaser.Scene {
    constructor() {
        super("BADLANDS")
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('background5', './assets/background5.png')
    }

    create() {
        if (gameCardsRemaining == 0) {
            this.add.rectangle(0, 0, 1000, 1000, '#000000', '#000000')
            this.add.text(270, 240, 'GAME OVER')
        }
        else if (playerCards.length == 12) {
            this.add.rectangle(0, 0, 1000, 1000, '#000000', '#000000')
            this.add.text(15, 150, "CONGRATULATIONS ON COMPLETING GREED ISLAND!").setColor('#FFFFFF')
        }
        else {
            // // display score
            // this.scoreDisplay = this.add.text(50, 50, 'CARDS COLLECTED: ' + score)
            // this.scoreDisplay.setDepth(999)

            // deactivate & reset space key capture from menu
            this.input.keyboard.removeCapture('SPACE')
            keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

            // load background image
            this.add.image(320, 240, 'background5')

            // load player sprite
            this.add.image(50, 150, 'player')
        }
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            quests['BADLANDS'] = false
            this.scene.start('selectScene')
        }
    }
}