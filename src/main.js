
import ElegirPersonaje from './scenes/ElegirPersonaje.js';
import Nivel1 from './scenes/Nivel1.js';
import Nivel2 from './scenes/Nivel2.js';
import GameOver from './scenes/GameOver.js';
import Presentacion from './scenes/Presentacion.js';
import MenuPrincipal from './scenes/MenuPrincipal.js';
import CapturarAlias from './scenes/CapturarAlias.js';
import Creditos from './scenes/Creditos.js';
import Instrucciones from './scenes/Instrucciones.js'

// Configuración del juego
const config = {
    type: Phaser.AUTO,           // Tipo de renderizado (WebGL o Canvas)
    width: 800,                  // Ancho de la pantalla
    height: 600,                 // Alto de la pantalla
    physics: {
        default: 'arcade',       // Motor de físicas (Arcade es el más simple)
        arcade: {
            gravity: { y: 300 }, // Gravedad en el eje Y
            debug: false  // Modo debug (muestra hitboxes)
        }
    },
    scene: [Presentacion,MenuPrincipal,CapturarAlias,ElegirPersonaje,Nivel1,Nivel2,GameOver,Creditos,Instrucciones ], // Cargar solo la escena de Nivel 1
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
