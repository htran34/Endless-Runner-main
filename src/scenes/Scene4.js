class Scene4 extends Phaser.Scene {
    constructor() {
        super("AIAI")
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('background4', './assets/background4.png')
    }

    create() {
        // boolean to check if game has to be restarted from a player loss
        this.gameEnded = false;

        // deactivate & reset space key capture from menu
        this.input.keyboard.removeCapture('SPACE')
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // load background image
        this.add.image(320, 240, 'background4')

        // load player sprite
        this.add.image(150, 400, 'player')

        // Dialogue
        if (!quests['AIAI']) {
            this.dialogue1 = this.add.text(10, 300, "Welcome to AIAI, Greed Island's city of love!")
            this.dialogue2 = this.add.text(10, 325, "In AIAI, you can earn money by showing love to those in need!")
        }
        else {
            this.dialogue1 = this.add.text(10, 300, "Oh my! What a handsome young boy! My daughter has no friends")
            this.dialogue2 = this.add.text(10, 325, "at school and feels very lonely, could you date her?")
            this.dialogue3 = this.add.text(10, 350, "If it's money you need, I can pay! I'm actually the Mayor of AIAI.")
            this.dialogue4 = this.add.text(10, 375, "YES  <-  |  ->NO")
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

        if (quests['AIAI']) {
            if (leftJustPressed) {
                this.toggleDialogue()
                this.dialogue5 = this.add.text(10, 300, "Thank you so much! You're such a kind person!")
                this.dialogue6 = this.add.text(10, 325, "As a token of my appreciation, please allow me to give you this.")
                this.dialogue7 = this.add.text(10, 350, "You obtained 3000 credits.")
                playerCash += 3000
            }
            else if (rightJustPressed) {
                this.toggleDialogue()
                this.dialogue5 = this.add.text(10, 300, "I understand, the city of AIAI pays mercy to no one...")
            }
        }
    
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.scene.start('selectScene')
        }
    }
}