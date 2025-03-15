import Presentacion from './scenes/Presentacion.js';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Presentacion],
    // Otras configuraciones de Phaser
};

const game = new Phaser.Game(config);