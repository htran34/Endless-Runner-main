// class Scene1 extends Phaser.Scene {
//     constructor() {
//         super("massadora")
//     }

//     preload() {
//         // load images/tile sprites
//         this.load.image('player', './assets/player.png')
//         this.load.image('background', './assets/background.png')
//         this.load.audio('music', './assets/backgroundMusic.wav')
//     }

//     create() {
//         // boolean to check if game has to be restarted from a player loss
//         this.gameEnded = false;

//         // display score
//         this.scoreDisplay = this.add.text(50, 50, 'CARDS COLLECTED: ' + score)
//         this.scoreDisplay.setDepth(999)

//         // deactivate space key capture from menu
//         this.input.keyboard.removeCapture('SPACE')

//         // play music
//         this.music = this.sound.play('music', soundConfig)

//         // load background image
//         this.add.image(320, 240, 'background')

//         // load player sprite
//         this.add.image(150, 400, 'player')
//     }

//     update() {
       
//     }

// }

class Scene1 extends Phaser.Scene {
    buttons = []
    selectedButtonIndex = 0
  
    constructor() {
        super("massadora")
    }
  
    init() {
        this.cursors = this.input.keyboard.createCursorKeys()
    }
  
    preload() {
        // load images/tile sprites
        this.load.image('player', './assets/player.png')
        this.load.image('background', './assets/background.png')
        this.load.audio('music', './assets/backgroundMusic.wav')
        this.load.image("glass-panel", "assets/PNG/glassPanel.png")
        this.load.image("cursor-hand", "assets/PNG/cursor_hand.png")
    }
  
    create() {
        const { width, height } = this.scale
  
        // 3 Defined Buttons
        const playButton = this.add
            .image(width * 0.5, height * 0.6, "glass-panel")
            .setDisplaySize(150, 50)
        this.add.text(playButton.x, playButton.y, "Play").setOrigin(0.5)
        const settingsButton = this.add
            .image(
              playButton.x,
              playButton.y + playButton.displayHeight + 10,
              "glass-panel"
            )
            .setDisplaySize(150, 50)
        this.add.text(settingsButton.x, settingsButton.y, "Settings").setOrigin(0.5)
        const creditsButton = this.add
            .image(
              settingsButton.x,
              settingsButton.y + settingsButton.displayHeight + 10,
              "glass-panel"
            )
            .setDisplaySize(150, 50)
        this.add.text(creditsButton.x, creditsButton.y, "Credits").setOrigin(0.5)
        
        
        
    
        this.buttons.push(playButton)
        this.buttons.push(settingsButton)
        this.buttons.push(creditsButton)
        this.buttonSelector = this.add.image(0, 0, "cursor-hand")
        this.selectButton(0)
    
        playButton.on("selected", () => {
            console.log("play")
        })
    
        settingsButton.on("selected", () => {
            console.log("settings")
        })
    
        creditsButton.on("selected", () => {
            console.log("credits")
        })
    }
  
    selectButton(index) {
      const currentButton = this.buttons[this.selectedButtonIndex]
  
      // set the current selected button to a white tint
      currentButton.setTint(0xffffff)
  
      const button = this.buttons[index]
  
      // set the newly selected button to a green tint
      button.setTint(0x66ff7f)
  
      // move the hand cursor to the right edge
      this.buttonSelector.x = button.x + button.displayWidth * 0.5
      this.buttonSelector.y = button.y + 10
  
      // store the new selected index
      this.selectedButtonIndex = index
    }
  
    selectNextButton(change = 1) {
      let index = this.selectedButtonIndex + change
  
      // wrap the index to the front or end of array
      if (index >= this.buttons.length) {
        index = 0
      } else if (index < 0) {
        index = this.buttons.length - 1
      }
  
      this.selectButton(index)
    }
  
    confirmSelection() {
      // get the currently selected button
      const button = this.buttons[this.selectedButtonIndex]
  
      // emit the 'selected' event
      button.emit("selected")
    }
  
    update() {
      const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up)
      const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down)
      const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
  
      if (upJustPressed) {
        this.selectNextButton(-1)
      } else if (downJustPressed) {
        this.selectNextButton(1)
      } else if (spaceJustPressed) {
        this.confirmSelection()
      }
    }
  }