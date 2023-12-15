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
        this.load.image('playerNaked', './assets/playerNaked.png')
        this.load.image('background3', './assets/background3.png')
        this.load.image('gameover', './assets/gameover.png')
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
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
            this.add.image(320, 240, 'background3')

            // load player sprite
            if (!playerHasClothes) {
                this.add.image(150, 400, 'playerNaked')
            }
            else {
                this.add.image(150, 400, 'player')
            }

            // Dialogue
            if (!quests['BUNZEN']) {
                this.dialogue1 = this.add.text(20, 300, "Welcome to BUNZEN, one of the largest cities in Greed Island!").setColor('#000000')
                // Ask player if they want clothes if they don't hold clothes
                if (!playerHasClothes) {
                    this.dialogue2 = this.add.text(20, 325, "Oh no, you're practically naked! Where are your clothes??").setColor('#000000')
                    this.dialogue3 = this.add.text(20, 350, "You poor thing. You can purchase clothes from me for 500 credits.").setColor('#000000')
                    this.dialogue4 = this.add.text(20, 375, "YES  <-  |  ->NO").setColor('#000000')
                }
                // Remind player to always wear clothes if they do hold clothes
                else {
                    this.dialogue2 = this.add.text(20, 325, "Make sure you're dressed warm, the weather around here can be").setColor('#000000')
                    this.dialogue3 = this.add.text(20, 350, "freezing during the winter!").setColor('#000000')
                }
                
            }
            // Quest introduction dialogue
            else {
                this.dialogue1 = this.add.text(20, 300, "Hello stranger! Rumor has it that there is a monster lurking in").setColor('#000000')
                this.dialogue2 = this.add.text(20, 325, "amidst the shadows of our city, stealing players' cards...I'm").setColor('#000000')
                this.dialogue3 = this.add.text(20, 350, "a bit skeptical it exists, but I'd steer clear if I were you...").setColor('#000000')
                this.dialogue4 = this.add.text(20, 375, "Remain in BUNZEN? YES  <-  |  ->NO").setColor('#000000')
            }
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

        // Player regains clothes if they have credits >= 500 
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

        // Bunzen Quest
        else if (quests['BUNZEN']) {
            if (leftJustPressed) {
                this.toggleDialogue()

                // Randomly select a card remaining within the game for player to take
                this.groundItem = Object.keys(gameCards)[this.getRandomInt(Object.keys(gameCards).length)]
                this.itemQuantity = this.getRandomInt(gameCards[this.groundItem]) + 1
                gameCards[this.groundItem] -= this.itemQuantity
                if (gameCards[this.groundItem] == 0) {
                    delete gameCards[this.groundItem]
                }
                gameCardsRemaining -= this.itemQuantity
                playerCards.indexOf(this.groundItem) === -1 ? playerCards.push(this.groundItem) : console.log("Player already holds card, not adding item to list.");

                // Quest dialogue
                this.dialogue5  = this.add.text(20, 150, "(A figure emerged from the shadows...it seems to be human?!)").setColor('#000000')
                this.dialogue6  = this.add.text(20, 175, "You there! Give me all of your cards!").setColor('#000000')
                this.dialogue7  = this.add.text(20, 200, "(You rummage around in your bag and throw a rock at the person)").setColor('#000000')
                this.dialogue8  = this.add.text(20, 225, "Argh! You little runt! This isn't over!").setColor('#000000')
                this.dialogue9  = this.add.text(20, 250, "(The person ran away, and you picked up some").setColor('#000000')
                this.dialogue10 = this.add.text(20, 275, "scattered cards on the ground.").setColor('#000000')
                this.dialogue11 = this.add.text(20, 300, "You acquired " +this.itemQuantity+ " copies of " +this.groundItem+ ".").setColor('#000000')
            }
            else if (rightJustPressed) {
                // Use a copy of accompany to travel out of Bunzen if player has any accompany remaining
                if (inventories['player']['Accompany'] >= 1) {
                    inventories['player']['Accompany'] -= 1
                    if (inventories['player']['Accompany'] == 0) {
                        const index = playerCards.indexOf('Accompany')
                        playerCards.splice(index, 1) 
                    }
                    this.scene.start('ACCOMPANY')
                }
                else {
                    this.scene.start('BUNZEN')
                }
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            quests['BUNZEN'] = false
            this.scene.start('selectScene')
        }
    }
}