import Instrucciones from './scenes/Instrucciones.js'; // Importar la escena de Instrucciones

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Instrucciones], // Usar Instrucciones como la escena inicial para testear
};

const game = new Phaser.Game(config);