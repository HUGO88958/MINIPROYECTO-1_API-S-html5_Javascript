//import Presentacion from './scenes/Presentacion.js';
//import ElegirPersonaje from './scenes/ElegirPersonaje.js';
import Nivel1 from './scenes/Nivel1.js';
import Nivel2 from './scenes/Nivel2.js';


// Configuración del juego
const config = {
    type: Phaser.AUTO,           // Tipo de renderizado (WebGL o Canvas)
    width: 800,                  // Ancho de la pantalla
    height: 600,                 // Alto de la pantalla
    physics: {
        default: 'arcade',       // Motor de físicas (Arcade es el más simple)
        arcade: {
            gravity: { y: 300 }, // Gravedad en el eje Y
            debug: false       // Modo debug (muestra hitboxes)
        }
    },
    scene: [Nivel1, Nivel2] // Cargar solo la escena de Nivel 1
};

// Crear una instancia del juego
const game = new Phaser.Game(config);