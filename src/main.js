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

// track all players 
let players = ['player', 'Killua', 'Biscuit', 'Genthru', 'Bara', 'Nickes', 'Phinks', 'Machi', 'Feitan', 'Nobunaga', 'Hisoka']
let accompanies = {'player': 5, 'Killua': 5, 'Biscuit': 5, 'Genthru': 5, 'Bara': 5, 'Nickes': 5, 'Phinks': 5, 'Machi': 5, 'Feitan': 5, 'Nobunaga': 5, 'Hisoka': 5}
let cards = {'player': {}, 'Killua': {}, 'Biscuit': {}, 'Genthru': {}, 'Bara': {}, 'Nickes': {}, 'Phinks': {}, 'Machi': {}, 'Feitan': {}, 'Nobunaga': {}, 'Hisoka': {}}

// reserve keyboard vars
let keySpace, score
let currentScene = 0
let currentTurn = 1
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