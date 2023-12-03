// Hunter Tran
// External sources used:
// Menu Selection w/ Cursor in TypeScript: https://blog.ourcade.co/posts/2020/phaser-3-ui-menu-selection-cursor-selector/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
      default: 'arcade',
      arcade: {
          // gravity: { y: 300 },
          debug: false
      }
    },
    scene: [mainMenu, optionMenu, Scene1]
};

let game = new Phaser.Game(config)

// reserve keyboard vars
let keySpace, score
let currentScene = 0
// text configuration
let textConfig = {
  fontSize: '28px',
  align: 'center',
  strokeThickness: 3
}
// sound configuration
let soundConfig = {
  volume: 2,
  loop: true
}