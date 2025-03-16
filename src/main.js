//import Presentacion from './scenes/Presentacion.js';
import ElegirPersonaje from './scenes/ElegirPersonaje.js';
import Nivel1 from './scenes/Nivel1.js';
import Nivel2 from './scenes/Nivel2.js';
import GameOver from './scenes/GameOver.js';
import Felicitaciones from './scenes/Felicitaciones.js';
Felicitaciones

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
    scene: [ElegirPersonaje,Nivel1,Nivel2,GameOver], // Cargar solo la escena de Nivel 1
    type: Phaser.AUTO,
    width: 800,
    height: 600,
};

// Crear una instancia del juego
const game = new Phaser.Game(config);