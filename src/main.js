// Importar las escenas
import Presentacion from './scenes/Presentacion.js';
import MenuPrincipal from './scenes/MenuPrincipal.js';
import CapturaAlias from './scenes/CapturaAlias.js';
import ElegirPersonaje from './scenes/ElegirPersonaje.js';
import Nivel1 from './scenes/Nivel1.js';
import GameOver from './scenes/GameOver.js';
import Felicitaciones from './scenes/Felicitaciones.js';

// Configuración del juego
const config = {
    type: Phaser.AUTO,           // Tipo de renderizado (WebGL o Canvas)
    width: 800,                  // Ancho de la pantalla
    height: 600,                 // Alto de la pantalla
    physics: {
        default: 'arcade',       // Motor de físicas (Arcade es el más simple)
        arcade: {
            gravity: { y: 300 }, // Gravedad en el eje Y
            debug: false         // Modo debug (muestra hitboxes)
        }
    },
    scene: [                     // Escenas que se cargarán
        Presentacion,
        MenuPrincipal,
        CapturaAlias,
        ElegirPersonaje,
        Nivel1,
        GameOver,
        Felicitaciones
    ]
};

// Crear una instancia del juego
const game = new Phaser.Game(config);