import AudioManager from './scenes/AudioManager.js';
import ElegirPersonaje from './scenes/ElegirPersonaje.js';
import Nivel1 from './scenes/Nivel1.js';
import Nivel2 from './scenes/Nivel2.js';
import GameOver from './scenes/GameOver.js';
import Presentacion from './scenes/presentacion.js';
import MenuPrincipal from './scenes/MenuPrincipal.js';
import CapturarAlias from './scenes/CapturarAlias.js';
import Records from './scenes/Records.js';
import Creditos from './scenes/Creditos.js';
import Instrucciones from './scenes/Instrucciones.js';


//  Configuración del juego
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [
        Presentacion,
        MenuPrincipal,
        CapturarAlias,
        ElegirPersonaje,
        Nivel1,
        Nivel2,
        GameOver,
        Creditos,
        Instrucciones,
        Records
    ]
};

// Crear instancia del juego
const game = new Phaser.Game(config);

game.events.once('ready', () => {
    const canvas = game.canvas;
    canvas.id = 'gameCanvas'; 
});

window.onload = () => {
    const canvas = document.querySelector('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '50%';
    canvas.style.left = '50%';
    canvas.style.transform = 'translate(-50%, -50%)';
};

// Inicializar música global
class GlobalAudioScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GlobalAudioScene', active: true });
    }

    preload() {
        console.log('✅ Cargando música e íconos...');
        this.load.audio('musica', 'assets/sonidos/musica.mp3');
        this.load.image('audioOn', 'assets/recursos/audioOn.png');
        this.load.image('audioOff', 'assets/recursos/audioOff.png');
    }

    create() {
        //  Iniciar AudioManager
        AudioManager.getInstance(this).create();
    }
}



//  Agregar escena de audio global
game.scene.add('GlobalAudioScene', GlobalAudioScene);
