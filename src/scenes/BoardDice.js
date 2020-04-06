import Dice from '../entity/Dice';
import {socket} from '../index'

export default class BoardDice extends Phaser.Scene {
  constructor() {
    super('BoardDice');
  }

  init(data){
    this.queue = data.queue
    this.player = data.player
  }

  preload() {
    this.load.spritesheet('dice', 'assets/spriteSheets/dice.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    // Preload Sounds
  }


  diceRollAnimations() {
    this.anims.create({
      key: 'roll',
      frames: this.anims.generateFrameNumbers('dice', { start: 0, end: 5 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: '1',
      frames: [{ key: 'dice', frame: 0 }],
      frameRate: 10,
    });
    this.anims.create({
      key: '2',
      frames: [{ key: 'dice', frame: 1 }],
      frameRate: 10,
    });
    this.anims.create({
      key: '3',
      frames: [{ key: 'dice', frame: 2 }],
      frameRate: 10,
    });
    this.anims.create({
      key: '4',
      frames: [{ key: 'dice', frame: 3 }],
      frameRate: 10,
    });
    this.anims.create({
      key: '5',
      frames: [{ key: 'dice', frame: 4 }],
      frameRate: 10,
    });
    this.anims.create({
      key: '6',
      frames: [{ key: 'dice', frame: 5 }],
      frameRate: 10,
    });
  }

  create() {
    //create dice but hide it from players if its not their turn
    this.dice = new Dice(this, 900, 100, 'dice').setScale(1.75)
    this.disableDice()
    //enable dice only if its the user's turn
    if (this.player.name === this.queue[0]) this.enableDice()

    //listen for que update requests
    socket.on('unshiftQueue', () => {
      this.unshiftQueue()
      //emit queue change to boardbg scene so we can update the queue prompt
      socket.emit('changeQueuePrompt', this.queue[0])

      //enable dice only if its the user's turn
      if (this.player.name === this.queue[0]){
        this.enableDice()
      } else {
        this.disableDice()
      }
    })

    this.diceRollAnimations();

    //listen for mouse up event to trigger dice roll
    this.dice.on('pointerup', () => {
      this.rollDice()

    });

    socket.on('updateDice', (rolledNum) => {
      this.dice.anims.play(rolledNum)
    })

  }
  enableDice(){
    //this.dice.setActive(true).setVisible(true)
    this.dice.setInteractive()
  }
  disableDice(){
    //this.dice.setActive(false).setVisible(false);
    this.dice.disableInteractive()
  }

  unshiftQueue(){
    this.queue.push(this.queue.shift())
  }

  rollDice(){
    this.dice.roll()
    socket.emit('diceRoll', this.dice.rolledNum, this.player.name)
    this.disableDice()
  }


  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // this.dice.update(this.cursors, this.diceSound); // Add a parameter for the diceSound
    // this.dice.update()
  }
}
