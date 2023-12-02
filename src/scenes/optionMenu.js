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
        // Grab & display current scene background image
        let scenes = [NaN, 'background1']
        let cities = [NaN, 'Massadora']
        this.add.image(320, 240, scenes[currentScene])
        
        const { width, height } = this.scale
    
        //================================================================
        /* BUTTON DEFINITIONS */
        // Travel button
        const travelButton = this.add
            .image(width * 0.5, height * 0.6, "glass-panel")
            .setDisplaySize(150, 50)
    
        this.add.text(travelButton.x, travelButton.y, "Travel").setOrigin(0.5)
    
        // Quest button
        const questButton = this.add
            .image(
              travelButton.x,
              travelButton.y + travelButton.displayHeight + 10,
              "glass-panel"
            )
            .setDisplaySize(150, 50)
    
        this.add.text(questButton.x, questButton.y, "Enter Quest").setOrigin(0.5)
    
        // Check Cards button
        const checkCardsButton = this.add
            .image(
              questButton.x,
              questButton.y + questButton.displayHeight + 10,
              "glass-panel"
            )
            .setDisplaySize(150, 50)
    
        this.add.text(checkCardsButton.x, checkCardsButton.y, "Check Cards").setOrigin(0.5)
    
        this.buttons.push(travelButton)
        this.buttons.push(questButton)
        this.buttons.push(checkCardsButton)
        this.buttonSelector = this.add.image(0, 0, "cursor-hand")
        this.selectButton(0)
    
        travelButton.on("selected", () => {
            console.log("play")
        })
    
        questButton.on("selected", () => {
            console.log("settings")
        })
    
        checkCardsButton.on("selected", () => {
            console.log("credits")
        })
    }
  
    selectButton(index) {
      const currentButton = this.buttons[this.selectedButtonIndex]
      currentButton.setTint(0xffffff)
      const button = this.buttons[index]
      button.setTint(0x66ff7f)
      this.buttonSelector.x = button.x + button.displayWidth * 0.5
      this.buttonSelector.y = button.y + 10
      this.selectedButtonIndex = index
    }
  
    selectNextButton(change = 1) {
      let index = this.selectedButtonIndex + change
      if (index >= this.buttons.length) {
        index = 0
      } else if (index < 0) {
        index = this.buttons.length - 1
      }
  
      this.selectButton(index)
    }
  
    confirmSelection() {
      const button = this.buttons[this.selectedButtonIndex]
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