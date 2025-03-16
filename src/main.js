import Presentacion from './scenes/Presentacion.js';
import MenuPrincipal from './scenes/MenuPrincipal.js';
import CapturarAlias from './scenes/CapturarAlias.js';
import Creditos from './scenes/Creditos.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Presentacion, MenuPrincipal, Creditos, CapturarAlias],
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const game = new Phaser.Game(config);

// Centrar la ventana
window.onload = () => {
    const canvas = document.querySelector('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
};
