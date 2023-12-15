class Scene5 extends Phaser.Scene {
    constructor() {
        super("BADLANDS")
    }

    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('killua', './assets/killua.png')
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
            // deactivate & reset space key capture from menu
            this.input.keyboard.removeCapture('SPACE')
            keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

            // load background image
            this.add.image(320, 240, 'background5')

            // load player sprite
            this.add.image(50, 150, 'player')

            // Dialogue
            if (!quests['BADLANDS']) {
                this.dialogue1 = this.add.text(10, 300, "(The wind howls through the canyon of cold & unforgiving rocks.)")
                this.dialogue2 = this.add.text(10, 325, "(You hear what can only be described as distant screams...)")
            }
        }
    }

    toggleDialogue() {
        this.dialogue1.setVisible(false)
        this.dialogue2.setVisible(false)
    }

    update() {
        if (quests['BADLANDS']) {
            this.toggleDialogue()

            gameCardsRemaining -= this.itemQuantity
            playerCards.indexOf(this.giftItem2) === -1 ? playerCards.push(this.giftItem2) : console.log("Player already holds card, not adding item to list.");
            this.add.image(240, 200, 'killua')
            this.dialogue3 = this.add.text(10, 300, "Hey there friend, you look a little lost!")
            this.dialogue4 = this.add.text(10, 325, "This area can be really dangerous if you're not careful,")
            this.dialogue5 = this.add.text(10, 350, "it's filled to the brim with high level monsters")
            this.dialogue6 = this.add.text(10, 375, "& players that'll take your cards!")
            this.dialogue7 = this.add.text(10, 400, "By the way, did you know you can buy clothes in Bunzen?")
            this.dialogue8 = this.add.text(10, 425, "You never know who might end up really needing them.")
        }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            quests['BADLANDS'] = false
            this.scene.start('selectScene')
        }
    }
}