class optionMenu extends Phaser.Scene {
    buttons = []
    selectedButtonIndex = 0
  
    constructor() {
      super("selectScene")
    }
  
    init() {
      this.cursors = this.input.keyboard.createCursorKeys()
    }
  
    preload() {
      // load images/tile sprites
      this.load.image('player', './assets/player.png')
      this.load.image('background1', './assets/background.png')
      this.load.audio('music', './assets/backgroundMusic.wav')
      this.load.image("glass-panel", "assets/PNG/glassPanel.png")
      this.load.image("cursor-hand", "assets/PNG/cursor_hand.png")
    }
  
    create() {
      
      // Array to select current scene background image
      let scenes = [NaN, 'background1']

      this.add.image(320, 240, scenes[currentScene])
      
      const { width, height } = this.scale
  
      // Play button
      const playButton = this.add
        .image(width * 0.5, height * 0.6, "glass-panel")
        .setDisplaySize(150, 50)
  
      this.add.text(playButton.x, playButton.y, "Play").setOrigin(0.5)
  
      // Settings button
      const settingsButton = this.add
        .image(
          playButton.x,
          playButton.y + playButton.displayHeight + 10,
          "glass-panel"
        )
        .setDisplaySize(150, 50)
  
      this.add.text(settingsButton.x, settingsButton.y, "Settings").setOrigin(0.5)
  
      // Credits button
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