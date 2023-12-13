class Scene3 extends Phaser.Scene {
    constructor() {
        super("BUNZEN")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('background3', './assets/background3.png')
    }

    create() {
        // boolean to check if game has to be restarted from a player loss
        this.gameEnded = false;

        // deactivate & reset space key capture from menu
        this.input.keyboard.removeCapture('SPACE')
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // load background image
        this.add.image(320, 240, 'background3')

        // load player sprite
        this.add.image(150, 400, 'player')

        // Dialogue
        if (!quests['BUNZEN']) {
            this.dialogue1 = this.add.text(20, 300, "Welcome to BUNZEN, one of the largest cities in Greed Island!").setColor('#000000')
            if (!playerHasClothes) {
                this.dialogue2 = this.add.text(20, 325, "Oh no, you're practically naked! Where are your clothes??").setColor('#000000')
                this.dialogue3 = this.add.text(20, 350, "You poor thing. You can purchase clothes from me for 500 credits.").setColor('#000000')
                this.dialogue4 = this.add.text(20, 375, "YES  <-  |  ->NO").setColor('#000000')
            }
            else {
                this.dialogue2 = this.add.text(20, 325, "Make sure you're dressed warm, the weather around here can be").setColor('#000000')
                this.dialogue3 = this.add.text(20, 350, "freezing during the winter!").setColor('#000000')
            }
            
        }
        else {
            this.dialogue1 = this.add.text(20, 300, "Hello stranger! Rumor has it that there is a monster lurking in").setColor('#000000')
            this.dialogue2 = this.add.text(20, 325, "amidst the shadows of our city, stealing players' cards...I'm").setColor('#000000')
            this.dialogue3 = this.add.text(20, 350, "a bit skeptical it exists, but I'd steer clear if I were you...").setColor('#000000')
            this.dialogue4 = this.add.text(20, 375, "Remain in BUNZEN? YES  <-  |  ->NO").setColor('#000000')
        }
    }

    toggleDialogue() {
        this.dialogue1.setVisible(false)
        this.dialogue2.setVisible(false)
        this.dialogue3.setVisible(false)
        this.dialogue4.setVisible(false)
    }

    update() {
        const leftJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left)
        const rightJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right)

        if (!quests['BUNZEN']) {
            if (leftJustPressed) {
                this.toggleDialogue()
                if (playerCash >= 500) {
                    playerCash -= 500
                    playerHasClothes = true
                    this.dialogue5 = this.add.text(20, 300, "(You regained your clothes!)").setColor('#000000')
                    this.dialogue6 = this.add.text(20, 325, "Oh yes, I remember these clothes, their previous owner").setColor('#000000')
                    this.dialogue7 = this.add.text(20, 350, "told me that they needed to sell them to buy medicine...").setColor('#000000')
                }
                else {
                    this.dialogue5 = this.add.text(20, 300, "Sorry, but you don't have enough credits for me to sell").setColor('#000000')
                    this.dialogue6 = this.add.text(20, 325, "these clothes to you. Come back again!").setColor('#000000')
                }
            }
            else if (rightJustPressed) {
                this.toggleDialogue()
                this.dialogue5 = this.add.text(20, 300, "Okay, have a nice day.").setColor('#000000')
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('selectScene')
        }
    }
}