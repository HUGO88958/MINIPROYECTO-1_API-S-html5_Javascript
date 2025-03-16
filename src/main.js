import GameOver from './scenes/GameOver.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [GameOver], // SOLO GameOver para testear
};

const game = new Phaser.Game(config);