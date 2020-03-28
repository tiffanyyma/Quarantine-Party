import 'phaser'

export default class EndScene extends Phaser.Scene {
  constructor() {
    super('EndScene');

    const first = '';
    const second = '';
    const third = '';
    const fourth = '';

  }
  init(data) {
    // setting data passed from board to variables
    this.first = data.first;
    this.second = data.second;
    this.third = data.third;
    this.fourth = data.fourth;
  }

  preload() {
    // LOAD SPRITES
    this.load.spritesheet("ayse", "assets/spriteSheets/ayse-sheet.png", {
      frameWidth: 300,
      frameHeight: 300,
      endFrame: 8
    });
    this.load.spritesheet("stephanie", "assets/spriteSheets/stephanie-sheet.png",{
        frameWidth: 300,
        frameHeight: 300,
        endFrame: 8
      }
    );
    this.load.spritesheet("tiffany", "assets/spriteSheets/tiffany-sheet.png", {
      frameWidth: 300,
      frameHeight: 300,
      endFrame: 8
    });
    this.load.spritesheet("patty", "assets/spriteSheets/patty-sheet.png", {
      frameWidth: 300,
      frameHeight: 300,
      endFrame: 8
    });

    // LOAD FG athings
    // this.load.image('podium', 'assets/sprites/podium.png')

    // LOAD BACKGROUND IMAGE
    this.load.image('background', 'assets/backgrounds/sky.png');
  }

  createCelebrations() {
    //add jumping anims so person in first place can look like they're celebrating?
  }

  create() {

    // Create Background
    this.add.image(-160, 0, 'background').setOrigin(0).setScale(0.5);
    this.header = this.add.text(250, 50, `CONGRATS ${this.first}!!!`, { fontSize: '32px', fill: '#000' });

    // Display players based on how well they placed
    this.add.sprite(400,300, this.first).setScale(1)
    this.add.sprite(200,450, this.second).setScale(0.5)
    this.add.sprite(400,450, this.third).setScale(0.5)
    this.add.sprite(600,450, this.fourth).setScale(0.5)

    // Create podium
    // this.podium = this.physics.add.staticGroup();
    // this.ground.create(400, 600, "podium").setScale(1);

    // Create collisions for all entities
    // this.physics.add.collider(this.firstPlace, this.podium)
    // this.physics.add.collider(this.otherPlayers, this.podium)
    // this.firstPlace.setCollideWorldBounds(true);
    // this.otherPlayers.setCollideWorldBounds(true);

    // Create celebration music
    // this.celebrateSound = this.sound.add('celebrate');


    // Play Again Button?
    // const playAgainButton = this.add.text(250, 250, 'Play Again?', { fontSize: '32px', fill: '#FFF' });
    // playAgainButton.setInteractive();


  }

  update() {
    // if Play Again is hit, restart game from beginning
    // playAgainButton.on('pointerup', () => {
    //   console.log('playagain pressed')
    //   this.scene.stop('EndScene')
    //   this.scene.start('StartingScene');
    // })
  }

}

