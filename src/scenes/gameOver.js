class gameOver extends Phaser.Scene {
    constructor() {
        super("GAME OVER")
    }

    preload() {
    }

    create() {
        this.add.rectangle(0, 0, 1000, 1000, '#000000', '#000000');

        if (gameCardsRemaining == 0) {
            this.add.text(20, 150, "GAME OVER")
        }
        else {
            this.add.text(20, 150, "CONGRATULATIONS ON COMPLETING GREED ISLAND!")
        }
    }

    update() {
    }
}