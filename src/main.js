import Presentacion from './scenes/presentacion.js';
import MenuPrincipal from './scenes/MenuPrincipal.js';
import Creditos from './scenes/Creditos.js'; 
import Nivel1 from './scenes/Nivel1.js';


const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [Presentacion, MenuPrincipal, Creditos, Nivel1], 
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

const game = new Phaser.Game(config);
