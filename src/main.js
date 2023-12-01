// Hunter Tran


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
    scene: [ Menu, Stage1, Stage2, Stage3, Stage4, Stage5]
};

let game = new Phaser.Game(config);

// reserve keyboard vars
let keySpace, score;
let stage6 = false;
let soundConfig = {
  volume: 2,
  loop: true
}